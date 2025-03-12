import {Entity, hasMany, model, property} from '@loopback/repository';
import {Item} from './item.model';

@model()
export class Todo extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  subtitle?: string;

  @property({
    type: 'string',
    required: true,
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
  })
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED';

  @hasMany(() => Item)
  items: Item[];

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
