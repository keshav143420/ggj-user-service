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
const CreateUserUseCase_1 = require("../../src/application/CreateUserUseCase");
const User_1 = require("../../src/domain/User");
describe('CreateUserUseCase', () => {
    let useCase;
    let mockUserRepository;
    let mockPasswordHasher;
    let mockEventPublisher;
    beforeEach(() => {
        mockUserRepository = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findByUsername: jest.fn(),
        };
        mockPasswordHasher = {
            hash: jest.fn(),
            compare: jest.fn(),
        };
        mockEventPublisher = {
            publishUserCreated: jest.fn(),
        };
        useCase = new CreateUserUseCase_1.CreateUserUseCase(mockUserRepository, mockPasswordHasher, mockEventPublisher);
    });
    it('should successfully create a user', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.findByUsername.mockResolvedValue(null);
        mockPasswordHasher.hash.mockResolvedValue('hashedPassword');
        const savedUser = new User_1.User({
            id: '1',
            username: 'testuser',
            email: 'test@example.com',
            passwordHash: 'hashedPassword',
            createdAt: new Date(),
        });
        mockUserRepository.save.mockResolvedValue(savedUser);
        const dto = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        };
        const result = yield useCase.execute(dto);
        expect(result).toEqual(savedUser);
        expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
        expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('testuser');
        expect(mockPasswordHasher.hash).toHaveBeenCalledWith('password123');
        expect(mockUserRepository.save).toHaveBeenCalled();
        expect(mockEventPublisher.publishUserCreated).toHaveBeenCalledWith(savedUser);
    }));
    it('should throw error if email exists', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUserRepository.findByEmail.mockResolvedValue(new User_1.User({}));
        const dto = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        };
        yield expect(useCase.execute(dto)).rejects.toThrow('Email already in use');
    }));
    it('should throw error if username exists', () => __awaiter(void 0, void 0, void 0, function* () {
        mockUserRepository.findByEmail.mockResolvedValue(null);
        mockUserRepository.findByUsername.mockResolvedValue(new User_1.User({}));
        const dto = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
        };
        yield expect(useCase.execute(dto)).rejects.toThrow('Username already in use');
    }));
});
//# sourceMappingURL=CreateUserUseCase.test.js.map