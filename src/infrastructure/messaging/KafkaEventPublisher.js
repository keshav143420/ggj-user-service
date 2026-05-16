"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaEventPublisher = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaEventPublisher {
    constructor(brokers) {
        const kafka = new kafkajs_1.Kafka({
            clientId: 'user-service',
            brokers,
        });
        this.producer = kafka.producer();
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            console.log('Connected to Kafka');
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.disconnect();
            console.log('Disconnected from Kafka');
        });
    }
    publishUserCreated(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = {
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            };
            yield this.producer.send({
                topic: 'user-created',
                messages: [{ value: JSON.stringify(event) }],
            });
            console.log(`Published user-created event for user ${user.id}`);
        });
    }
}
exports.KafkaEventPublisher = KafkaEventPublisher;
//# sourceMappingURL=KafkaEventPublisher.js.map