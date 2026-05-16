import { DataSource } from 'typeorm';
import { UserEntity } from './UserEntity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'user_service',
  synchronize: true, // For development, synchronize automatically
  logging: false,
  entities: [UserEntity],
  subscribers: [],
  migrations: [],
});

export const initializeDatabase = async () => {
  await AppDataSource.initialize();
  console.log('Data Source has been initialized!');
};
