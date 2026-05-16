import { IEventPublisher } from '../../domain/IEventPublisher';
import { User } from '../../domain/User';
export declare class KafkaEventPublisher implements IEventPublisher {
    private producer;
    constructor(brokers: string[]);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    publishUserCreated(user: User): Promise<void>;
}
//# sourceMappingURL=KafkaEventPublisher.d.ts.map