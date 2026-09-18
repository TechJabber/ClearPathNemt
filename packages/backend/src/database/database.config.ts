import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

const logger = new Logger('Database');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'clear_path_nemt',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  dropSchema: false,
});

// Initialize and log connection status
AppDataSource.initialize()
  .then(() => {
    logger.log('✅ Database connection established');
  })
  .catch((error) => {
    logger.error('❌ Database connection failed', error);
  });
