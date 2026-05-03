export abstract class ShowEditToDoDialogUseCase
{
  abstract executeAsync(id: string): Promise<void>;
}