import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  response
} from '@loopback/rest';
import {Item} from '../models';
import {ItemRepository, TodoRepository} from '../repositories';

export class TodoItemController {
  constructor(
    @repository(TodoRepository)
    protected todoRepository: TodoRepository,
    @repository(ItemRepository)
    protected itemRepository: ItemRepository,
  ) {}

  @get('/todos/{id}/items')
  @response(200, {
    description: 'Array of Items belonging to Todo',
    content: {
      'application/json': {
        schema: {type: 'array', items: getModelSchemaRef(Item)},
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.filter(Item) filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.todoRepository.items(id).find(filter);
  }
}
