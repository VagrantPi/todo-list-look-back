import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Todo} from './todo.model';

@model()
export class Item extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isCompleted: boolean;

  @property({
    type: 'date',
  })
  completedAt?: string;

  @belongsTo(() => Todo)
  todoId: number;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
