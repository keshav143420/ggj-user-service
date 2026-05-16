import { User } from './User';
export interface IEventPublisher {
    publishUserCreated(user: User): Promise<void>;
}
//# sourceMappingURL=IEventPublisher.d.ts.map