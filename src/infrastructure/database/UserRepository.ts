import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/IUserRepository';
import { User } from '../../domain/User';
import { UserEntity } from './UserEntity';

export class UserRepository implements IUserRepository {
  constructor(private readonly repository: Repository<UserEntity>) {}

  private mapToDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      passwordHash: entity.passwordHash,
      createdAt: entity.createdAt,
    });
  }

  private mapToEntity(domain: User): UserEntity {
    const entity = new UserEntity();
    if (domain.id) entity.id = domain.id;
    entity.username = domain.username;
    entity.email = domain.email;
    entity.passwordHash = domain.passwordHash;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    return entity;
  }

  async save(user: User): Promise<User> {
    const entity = this.mapToEntity(user);
    const savedEntity = await this.repository.save(entity);
    return this.mapToDomain(savedEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ email });
    return entity ? this.mapToDomain(entity) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ username });
    return entity ? this.mapToDomain(entity) : null;
  }
}
