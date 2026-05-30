export abstract class InitializeToDosUseCase
{
  abstract executeAsync(): Promise<void>;
}