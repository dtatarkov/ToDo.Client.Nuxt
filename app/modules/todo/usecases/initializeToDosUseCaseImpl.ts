import { dependency } from '@/modules/shared/decorators/dependency';
import { InitializeToDosUseCase } from "./initializeToDosUseCase";
import { ToDosOwner } from '../entities/todosOwner';

@dependency(ToDosOwner)
export class InitializeToDosUseCaseImpl extends InitializeToDosUseCase
{
  constructor(
    private todosOwner: ToDosOwner
  )
  {
    super();
  }

  async executeAsync(): Promise<void>
  {
    await this.todosOwner.initializeToDosAsync();
  }
}