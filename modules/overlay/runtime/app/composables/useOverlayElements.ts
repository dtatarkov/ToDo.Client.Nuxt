export function useOverlayElements()
{
  const overlayService                         = getService(OverlayService);
  const overlayElements: Ref<OverlayElement[]> = useObservable(overlayService.getElements());

  return { overlayElements };
}