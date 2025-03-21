import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {TodoListDataSource} from '../datasources';
import {Item, Todo, TodoRelations} from '../models';
import {ItemRepository} from './item.repository';

export class TodoRepository extends DefaultCrudRepository<
  Todo,
  typeof Todo.prototype.id,
  TodoRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof Todo.prototype.id>;

  constructor(
    @inject('datasources.todo_list') dataSource: TodoListDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(Todo, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
  }

  async softDelete(id: number): Promise<void> {
    await this.updateById(id, {status: 'DELETED'});
  }
}
