import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'todo_list',
  connector: 'mysql',
  url: '',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'todo_db'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TodoListDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'todo_list';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.todo_list', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
