import { Kafka, Producer } from 'kafkajs';
import { IEventPublisher } from '../../domain/IEventPublisher';
import { User } from '../../domain/User';

export class KafkaEventPublisher implements IEventPublisher {
  private producer: Producer;

  constructor(brokers: string[]) {
    const kafka = new Kafka({
      clientId: 'user-service',
      brokers,
    });
    this.producer = kafka.producer();
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    console.log('Connected to Kafka');
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
    console.log('Disconnected from Kafka');
  }

  async publishUserCreated(user: User): Promise<void> {
    const event = {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    await this.producer.send({
      topic: 'user-created',
      messages: [{ value: JSON.stringify(event) }],
    });
    console.log(`Published user-created event for user ${user.id}`);
  }
}
