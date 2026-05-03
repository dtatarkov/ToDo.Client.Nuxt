export abstract class ShowEditToDoDialogUseCase
{
  abstract execute(id: string): Promise<void>;
}