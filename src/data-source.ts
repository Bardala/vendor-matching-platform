// src/data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export default new DataSource({
  type: 'mysql',
  url: process.env.MYSQL_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
