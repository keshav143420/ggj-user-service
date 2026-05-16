import { CreateUserDTO } from './CreateUserDTO';
import { IUserRepository } from '../domain/IUserRepository';
import { IPasswordHasher } from '../domain/IPasswordHasher';
import { IEventPublisher } from '../domain/IEventPublisher';
import { User } from '../domain/User';
export declare class CreateUserUseCase {
    private userRepository;
    private passwordHasher;
    private eventPublisher;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, eventPublisher: IEventPublisher);
    execute(dto: CreateUserDTO): Promise<User>;
}
//# sourceMappingURL=CreateUserUseCase.d.ts.map