import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TodoListDataSource} from '../datasources';
import {Todo, TodoRelations, Item} from '../models';
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
}
