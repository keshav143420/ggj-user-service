import { CreateUserUseCase } from '../../src/application/CreateUserUseCase';
import { IUserRepository } from '../../src/domain/IUserRepository';
import { IPasswordHasher } from '../../src/domain/IPasswordHasher';
import { IEventPublisher } from '../../src/domain/IEventPublisher';
import { User } from '../../src/domain/User';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordHasher: jest.Mocked<IPasswordHasher>;
  let mockEventPublisher: jest.Mocked<IEventPublisher>;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn(),
      findByEmail: jest.fn(),
      findByUsername: jest.fn(),
    };
    mockPasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    mockEventPublisher = {
      publishUserCreated: jest.fn(),
    };

    useCase = new CreateUserUseCase(mockUserRepository, mockPasswordHasher, mockEventPublisher);
  });

  it('should successfully create a user', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByUsername.mockResolvedValue(null);
    mockPasswordHasher.hash.mockResolvedValue('hashedPassword');
    
    const savedUser = new User({
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
      createdAt: new Date(),
    });
    mockUserRepository.save.mockResolvedValue(savedUser);

    const dto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await useCase.execute(dto);

    expect(result).toEqual(savedUser);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('testuser');
    expect(mockPasswordHasher.hash).toHaveBeenCalledWith('password123');
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockEventPublisher.publishUserCreated).toHaveBeenCalledWith(savedUser);
  });

  it('should throw error if email exists', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(new User({}));

    const dto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    await expect(useCase.execute(dto)).rejects.toThrow('Email already in use');
  });

  it('should throw error if username exists', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.findByUsername.mockResolvedValue(new User({}));

    const dto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    await expect(useCase.execute(dto)).rejects.toThrow('Username already in use');
  });
});
