import express from 'express';
import { AppDataSource, initializeDatabase } from './infrastructure/database/ormconfig';
import { UserRepository } from './infrastructure/database/UserRepository';
import { UserEntity } from './infrastructure/database/UserEntity';
import { BcryptPasswordHasher } from './infrastructure/security/BcryptPasswordHasher';
import { KafkaEventPublisher } from './infrastructure/messaging/KafkaEventPublisher';
import { CreateUserUseCase } from './application/CreateUserUseCase';
import { UserController } from './delivery/http/UserController';
import { createUserRouter } from './delivery/http/UserRoutes';

const app = express();
app.use(express.json());

export const setupApp = async () => {
  await initializeDatabase();

  const userRepository = new UserRepository(AppDataSource.getRepository(UserEntity));
  const passwordHasher = new BcryptPasswordHasher();
  
  const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];
  const eventPublisher = new KafkaEventPublisher(brokers);
  await eventPublisher.connect();

  const createUserUseCase = new CreateUserUseCase(userRepository, passwordHasher, eventPublisher);
  const userController = new UserController(createUserUseCase);

  app.use('/api', createUserRouter(userController));

  return app;
};

export default app;
