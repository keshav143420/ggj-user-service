import request from 'supertest';
import express from 'express';
import { UserController } from '../../src/delivery/http/UserController';
import { createUserRouter } from '../../src/delivery/http/UserRoutes';

describe('UserController', () => {
  let app: express.Express;
  let mockCreateUserUseCase: any;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    mockCreateUserUseCase = {
      execute: jest.fn(),
    };

    const userController = new UserController(mockCreateUserUseCase);
    app.use('/api', createUserRouter(userController));
  });

  it('should create user and return 201', async () => {
    mockCreateUserUseCase.execute.mockResolvedValue({
      id: '1',
      username: 'test',
      email: 'test@example.com',
      createdAt: new Date().toISOString(),
    });

    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'test',
        email: 'test@example.com',
        password: 'password',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'test');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('should return 409 if email already in use', async () => {
    mockCreateUserUseCase.execute.mockRejectedValue(new Error('Email already in use'));

    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'test',
        email: 'test@example.com',
        password: 'password',
      });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error', 'Email already in use');
  });
});
