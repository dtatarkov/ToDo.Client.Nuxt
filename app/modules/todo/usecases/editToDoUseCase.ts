export abstract class EditToDoUseCase
{
  abstract executeAsync(id: string): Promise<void>;
}