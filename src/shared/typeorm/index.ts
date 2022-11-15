import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', //Local: localhost | Docker: postgres
  port: 1111, // Local: 1111 | Docker: 5432
  username: 'postgres',
  password: 'postgres',
  database: 'apivendas',
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  logging: false,
  synchronize: false,
  installExtensions: true,
  migrationsRun: false,
});

export default dataSource;
