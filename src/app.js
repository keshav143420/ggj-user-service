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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const ormconfig_1 = require("./infrastructure/database/ormconfig");
const UserRepository_1 = require("./infrastructure/database/UserRepository");
const UserEntity_1 = require("./infrastructure/database/UserEntity");
const BcryptPasswordHasher_1 = require("./infrastructure/security/BcryptPasswordHasher");
const KafkaEventPublisher_1 = require("./infrastructure/messaging/KafkaEventPublisher");
const CreateUserUseCase_1 = require("./application/CreateUserUseCase");
const UserController_1 = require("./delivery/http/UserController");
const UserRoutes_1 = require("./delivery/http/UserRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const setupApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, ormconfig_1.initializeDatabase)();
    const userRepository = new UserRepository_1.UserRepository(ormconfig_1.AppDataSource.getRepository(UserEntity_1.UserEntity));
    const passwordHasher = new BcryptPasswordHasher_1.BcryptPasswordHasher();
    const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];
    const eventPublisher = new KafkaEventPublisher_1.KafkaEventPublisher(brokers);
    yield eventPublisher.connect();
    const createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository, passwordHasher, eventPublisher);
    const userController = new UserController_1.UserController(createUserUseCase);
    app.use('/api', (0, UserRoutes_1.createUserRouter)(userController));
    return app;
});
exports.setupApp = setupApp;
exports.default = app;
//# sourceMappingURL=app.js.map