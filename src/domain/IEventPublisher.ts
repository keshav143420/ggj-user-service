import { User } from './User';

export interface IEventPublisher {
  publishUserCreated(user: User): Promise<void>;
}
