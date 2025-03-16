import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Item, Todo} from '../models';
import {ItemRepository, TodoRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TodoService {
  constructor(
    @repository(TodoRepository)
    public todoRepository: TodoRepository,
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) {}

  async createTodoWithItems(todoData: Partial<Todo>, items: Partial<Item>[]) {
    const todo = await this.todoRepository.create(todoData);
    for (const itemData of items) {
      await this.itemRepository.create({...itemData, todoId: todo.id});
    }
    return todo;
  }
}
