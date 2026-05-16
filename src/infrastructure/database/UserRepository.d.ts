import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/IUserRepository';
import { User } from '../../domain/User';
import { UserEntity } from './UserEntity';
export declare class UserRepository implements IUserRepository {
    private readonly repository;
    constructor(repository: Repository<UserEntity>);
    private mapToDomain;
    private mapToEntity;
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map