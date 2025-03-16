import {inject} from '@loopback/core';
import {
  Filter,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response
} from '@loopback/rest';
import {Item, Todo} from '../models';
import {TodoRepository} from '../repositories';
import {TodoService} from '../services';

export class TodoController {
  constructor(
    @repository(TodoRepository)
    public todoRepository : TodoRepository,
    @inject('services.TodoService')
    public todoService: TodoService,
  ) {}

  @post('/todo')
  @response(200, {
    description: 'Todo model instance with items',
    content: {'application/json': {schema: getModelSchemaRef(Todo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              todo: {
                type: 'object',
                properties: {
                  title: {type: 'string'},
                  subtitle: {type: 'string'},
                  status: {type: 'string', enum: ['ACTIVE', 'INACTIVE', 'DELETED']},
                },
                required: ['title'],
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    content: {type: 'string'},
                    isCompleted: {type: 'boolean'},
                    completedAt: {type: 'string', format: 'date-time'},
                  },
                  required: ['content', 'isCompleted'],
                },
              },
            },
          },
        },
      },
    })
    data: {
      todo: Omit<Todo, 'id'>;
      items?: Array<Omit<Item, 'id' | 'todoId'>>;
    },
  ): Promise<Todo> {
    return this.todoService.createTodoWithItems(data.todo, data.items || []);
  }

  @get('/todos')
  @response(200, {
    description: 'Array of Todo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todo) filter?: Filter<Todo>,
  ): Promise<Todo[]> {
    return this.todoRepository.find(filter);
  }

  @get('/todo/{id}')
  @response(200, {
    description: 'Todo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todo, {includeRelations: false}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number
  ): Promise<Todo> {
    return this.todoRepository.findById(id, {});
  }

  @patch('/todo/{id}')
  @response(204, {
    description: 'Todo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todo, {partial: true}),
        },
      },
    })
    todo: Todo,
  ): Promise<void> {
    await this.todoRepository.updateById(id, todo);
  }

  @del('/todo/{id}')
  @response(204, {
    description: 'Todo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoRepository.softDelete(id);
  }
}
