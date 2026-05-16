import { CreateUserDTO } from './CreateUserDTO';
import { IUserRepository } from '../domain/IUserRepository';
import { IPasswordHasher } from '../domain/IPasswordHasher';
import { IEventPublisher } from '../domain/IEventPublisher';
import { User } from '../domain/User';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private eventPublisher: IEventPublisher
  ) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new Error('Email already in use');
    }

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new Error('Username already in use');
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);

    const user = new User({
      username: dto.username,
      email: dto.email,
      passwordHash,
    });

    const savedUser = await this.userRepository.save(user);

    await this.eventPublisher.publishUserCreated(savedUser);

    return savedUser;
  }
}
