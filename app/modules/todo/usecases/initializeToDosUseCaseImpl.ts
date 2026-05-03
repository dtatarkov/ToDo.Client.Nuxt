import { dependency } from '@/modules/shared/decorators/dependency';
import { InitializeToDosUseCase } from "../interfaces/initializeToDosUseCase";
import { ToDosOwner } from '../interfaces/todosOwner';

@dependency(ToDosOwner)
export class InitializeToDosUseCaseImpl extends InitializeToDosUseCase
{
  constructor(
    private todosOwner: ToDosOwner
  )
  {
    super();
  }

  async execute(): Promise<void>
  {
    await this.todosOwner.initializeToDosAsync();
  }
}