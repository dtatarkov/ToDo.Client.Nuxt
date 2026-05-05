import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { InitializeToDosUseCase } from '@/modules/todo/interfaces/initializeToDosUseCase';
import type { ShowAddToDoDialogUseCase } from '@/modules/todo/interfaces/showAddToDoDialogUseCase';
import type { ShowEditToDoDialogUseCase } from '@/modules/todo/interfaces/showEditToDoDialogUseCase';
import { ToDosWidgetViewmodelImpl } from '@/modules/todo/viewmodels/todosWidgetViewmodelImpl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ToDoCardDataWithIdentity } from '../../types/todoCardData';
import type { GetToDoCardsUseCase } from '../../interfaces/getToDoCardsUseCase';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import type { ToolbarViewmodel } from '@/modules/uikit/interfaces/toolbarViewmodel';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';

describe('ToDosWidgetViewmodelImpl', () =>
{
  const mockInitializeToDosUseCase = {
    executeAsync: vi.fn()
  } satisfies InitializeToDosUseCase;

  const mockGetToDoCardsUseCase = {
    execute: vi.fn()
  } satisfies GetToDoCardsUseCase;

  const mockShowAddToDoDialogUseCase = {
    execute: vi.fn()
  } satisfies ShowAddToDoDialogUseCase;

  const mockShowEditToDoDialogUseCase = {
    executeAsync: vi.fn()
  } satisfies ShowEditToDoDialogUseCase;

  const mockToolbarViewmodel = {
    addElement: vi.fn()
  } as unknown as ToolbarViewmodel;

  const mockButtonGeneralViewmodel = {} as unknown as ButtonGeneralViewmodel;

  const mockUIKitViewmodelsFactory = {
    createToolbar: vi.fn().mockReturnValue(mockToolbarViewmodel),
    createButtonGeneral: vi.fn().mockReturnValue(mockButtonGeneralViewmodel)
  } as unknown as UIKitViewmodelsFactory;

  const viewModel = new ToDosWidgetViewmodelImpl(
    mockInitializeToDosUseCase,
    mockGetToDoCardsUseCase,
    mockShowAddToDoDialogUseCase,
    mockShowEditToDoDialogUseCase,
    mockUIKitViewmodelsFactory
  );

  const mockCardData = {
    id: '1',
    title: 'Test ToDo',
    description: 'Test Description'
  } satisfies ToDoCardDataWithIdentity;

  beforeEach(() =>
  {
    // Reset mocks
    vi.clearAllMocks();
  });

  describe('constructor', () =>
  {
    it('should create cards from todos', () =>
    {
      mockGetToDoCardsUseCase.execute.mockReturnValue(new ObservableSource([mockCardData]));

      const testViewmodel = new ToDosWidgetViewmodelImpl(
        mockInitializeToDosUseCase,
        mockGetToDoCardsUseCase,
        mockShowAddToDoDialogUseCase,
        mockShowEditToDoDialogUseCase,
        mockUIKitViewmodelsFactory
      );

      expect(mockGetToDoCardsUseCase.execute).toHaveBeenCalled();
      expect(testViewmodel.cards.value.length).toBe(1);
      expect(testViewmodel.cards.value[0]).toBe(mockCardData);
    });

    it('should create toolbar with add button', () =>
    {
      const testViewmodel = new ToDosWidgetViewmodelImpl(
        mockInitializeToDosUseCase,
        mockGetToDoCardsUseCase,
        mockShowAddToDoDialogUseCase,
        mockShowEditToDoDialogUseCase,
        mockUIKitViewmodelsFactory
      );

      expect(testViewmodel.toolbar).toBeDefined();
      expect(mockUIKitViewmodelsFactory.createToolbar).toHaveBeenCalled();
      expect(mockUIKitViewmodelsFactory.createButtonGeneral).toHaveBeenCalled();
      expect(mockToolbarViewmodel.addElement).toHaveBeenCalledWith(mockButtonGeneralViewmodel);
    });
  });

  describe('initialize', () =>
  {
    it('should call initializeUseCase.executeAsync', async () =>
    {
      await viewModel.initialize();
      expect(mockInitializeToDosUseCase.executeAsync).toHaveBeenCalled();
    });
  });

  describe('addToDo', () =>
  {
    it('should call showAddToDoDialogUseCase.execute', () =>
    {
      viewModel.addToDo();
      expect(mockShowAddToDoDialogUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('editToDo', () =>
  {
    it('should call showEditToDoDialogUseCase.executeAsync with the correct id', () =>
    {
      const id = '123';
      viewModel.editToDo(id);
      expect(mockShowEditToDoDialogUseCase.executeAsync).toHaveBeenCalledWith(id);
    });
  });
});