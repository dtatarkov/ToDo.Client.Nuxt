import { ObservableSource } from '@/modules/shared/entities/observableSource';
import type { InitializeToDosUseCase } from '@/modules/todo/interfaces/initializeToDosUseCase';
import type { ShowAddToDoDialogUseCase } from '@/modules/todo/interfaces/showAddToDoDialogUseCase';
import type { ShowEditToDoDialogUseCase } from '@/modules/todo/interfaces/showEditToDoDialogUseCase';
import { ToDosWidgetViewmodelImpl } from '@/modules/todo/viewmodels/todosWidgetViewmodelImpl';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GetToDoCardsUseCase } from '../../interfaces/getToDoCardsUseCase';
import type { UIKitViewmodelsFactory } from '@/modules/uikit/interfaces/uikitViewmodelsFactory';
import type { ToolbarViewmodel } from '@/modules/uikit/interfaces/toolbarViewmodel';
import type { ButtonGeneralViewmodel } from '@/modules/uikit/interfaces/buttonGeneralViewmodel';
import type { ToDoViewmodelsFactory } from '../../interfaces/todoViewmodelsFactory';
import type { ToDoCardViewmodel, ToDoCardViewmodelData } from '../../interfaces/todoCardViewmodel';
import type { GridViewmodel } from '@/modules/uikit/interfaces/gridViewmodel';
import type { Observable } from '@/modules/shared/interfaces/observable';

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

  const mockGridViewmodel = {
    key: '',

    component: {
      setup: vi.fn(),
    },

    elements: [],

    setSource: vi.fn(),
  } satisfies GridViewmodel;

  const mockToolbarViewmodel = {
    addElement: vi.fn()
  } as unknown as ToolbarViewmodel;

  const mockButtonGeneralViewmodel = {} as unknown as ButtonGeneralViewmodel;

  const mockUIKitViewmodelsFactory = {
    createGrid: vi.fn().mockReturnValue(mockGridViewmodel),
    createToolbar: vi.fn().mockReturnValue(mockToolbarViewmodel),
    createButtonGeneral: vi.fn().mockReturnValue(mockButtonGeneralViewmodel),
  } as unknown as UIKitViewmodelsFactory;

  const mockToDoCardViewmodel = {
    key: '',

    component: {
      setup: vi.fn(),
    },

    setSource: vi.fn(),
    setClickHandler: vi.fn,
  } satisfies ToDoCardViewmodel;

  const mockToDoViewmodelsFactory = {
    createToDoCard: vi.fn().mockReturnValue(mockToDoCardViewmodel)
  } satisfies ToDoViewmodelsFactory;

  const viewModel = new ToDosWidgetViewmodelImpl(
    mockInitializeToDosUseCase,
    mockGetToDoCardsUseCase,
    mockShowAddToDoDialogUseCase,
    mockShowEditToDoDialogUseCase,
    mockUIKitViewmodelsFactory,
    mockToDoViewmodelsFactory
  );

  const mockCardData = {
    id: '1',
    title: 'Test ToDo',
    description: 'Test Description'
  } satisfies ToDoCardViewmodelData;

  beforeEach(() =>
  {
    // Reset mocks
    vi.clearAllMocks();
  });

  describe('constructor', () =>
  {
    it('should create todo cards grid', () =>
    {
      mockGetToDoCardsUseCase.execute.mockReturnValue(new ObservableSource([mockCardData]));

      mockGridViewmodel.setSource.mockImplementation((cards: Observable<ToDoCardViewmodel[]>) =>
      {
        expect(cards.value).toEqual([mockToDoCardViewmodel]);
      });

      const testViewmodel = new ToDosWidgetViewmodelImpl(
        mockInitializeToDosUseCase,
        mockGetToDoCardsUseCase,
        mockShowAddToDoDialogUseCase,
        mockShowEditToDoDialogUseCase,
        mockUIKitViewmodelsFactory,
        mockToDoViewmodelsFactory
      );

      expect(mockGetToDoCardsUseCase.execute).toHaveBeenCalled();
      expect(mockUIKitViewmodelsFactory.createGrid).toHaveBeenCalled();
      expect(testViewmodel.grid).toBe(mockGridViewmodel);
      expect(mockToDoViewmodelsFactory.createToDoCard).toBeCalled();
      expect(mockToDoCardViewmodel.setSource).toBeCalledWith(mockCardData);
    });

    it('should create toolbar with add button', () =>
    {
      const testViewmodel = new ToDosWidgetViewmodelImpl(
        mockInitializeToDosUseCase,
        mockGetToDoCardsUseCase,
        mockShowAddToDoDialogUseCase,
        mockShowEditToDoDialogUseCase,
        mockUIKitViewmodelsFactory,
        mockToDoViewmodelsFactory
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