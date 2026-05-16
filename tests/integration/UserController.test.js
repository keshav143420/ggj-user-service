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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../../src/delivery/http/UserController");
const UserRoutes_1 = require("../../src/delivery/http/UserRoutes");
describe('UserController', () => {
    let app;
    let mockCreateUserUseCase;
    beforeEach(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        mockCreateUserUseCase = {
            execute: jest.fn(),
        };
        const userController = new UserController_1.UserController(mockCreateUserUseCase);
        app.use('/api', (0, UserRoutes_1.createUserRouter)(userController));
    });
    it('should create user and return 201', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCreateUserUseCase.execute.mockResolvedValue({
            id: '1',
            username: 'test',
            email: 'test@example.com',
            createdAt: new Date().toISOString(),
        });
        const response = yield (0, supertest_1.default)(app)
            .post('/api/users')
            .send({
            username: 'test',
            email: 'test@example.com',
            password: 'password',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('username', 'test');
        expect(response.body).toHaveProperty('email', 'test@example.com');
    }));
    it('should return 409 if email already in use', () => __awaiter(void 0, void 0, void 0, function* () {
        mockCreateUserUseCase.execute.mockRejectedValue(new Error('Email already in use'));
        const response = yield (0, supertest_1.default)(app)
            .post('/api/users')
            .send({
            username: 'test',
            email: 'test@example.com',
            password: 'password',
        });
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('error', 'Email already in use');
    }));
});
//# sourceMappingURL=UserController.test.js.map