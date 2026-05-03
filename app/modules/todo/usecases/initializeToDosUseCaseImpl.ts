import { InitializeToDosUseCase } from "../interfaces/initializeToDosUseCase";

export class InitializeToDosUseCaseImpl extends InitializeToDosUseCase
{
  async execute(): Promise<void>
  {
    // Implementation for initializing todos
    console.log('Initializing todos...');
  }
}