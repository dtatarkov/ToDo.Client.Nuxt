import { describe, it, expect } from 'vitest';
import { OverlayBase } from '../../src/entities/overlayBase';
import { ModalViewmodelsFactoryImpl } from '../../src/factories/modalViewmodelsFactoryImpl';
import { createUiKitViewmodelsFactoryMock } from '@client/ui-uikit/mocks';
import { viewmodelMock } from '@client/ui-core/mocks';

function setupOverlay()
{
    const uikit = createUiKitViewmodelsFactoryMock();
    const modalFactory = new ModalViewmodelsFactoryImpl(uikit);
    const overlay = new OverlayBase(modalFactory);

    return { overlay };
}

describe('OverlayBase', () =>
{
    describe('elements', () =>
    {
        it('initial value should be empty array', () =>
        {
            const { overlay } = setupOverlay();

            expect(overlay.elements.value).toHaveLength(0);
        });
    });

    describe('createModal', () =>
    {
        it('should update elements when modal is added', () =>
        {
            const { overlay } = setupOverlay();

            overlay.createModal({
                title: 'Test',
                content: viewmodelMock,
            });

            expect(overlay.elements.value).toHaveLength(1);
        });

        it('should update elements when modal is closed', () =>
        {
            const { overlay } = setupOverlay();

            const modal = overlay.createModal({
                title: 'Test',
                content: viewmodelMock,
            });

            modal.close();

            expect(overlay.elements.value).toHaveLength(0);
        });
    });
});
