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
exports.CreateUserUseCase = void 0;
const User_1 = require("../domain/User");
class CreateUserUseCase {
    constructor(userRepository, passwordHasher, eventPublisher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.eventPublisher = eventPublisher;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmail = yield this.userRepository.findByEmail(dto.email);
            if (existingEmail) {
                throw new Error('Email already in use');
            }
            const existingUsername = yield this.userRepository.findByUsername(dto.username);
            if (existingUsername) {
                throw new Error('Username already in use');
            }
            const passwordHash = yield this.passwordHasher.hash(dto.password);
            const user = new User_1.User({
                username: dto.username,
                email: dto.email,
                passwordHash,
            });
            const savedUser = yield this.userRepository.save(user);
            yield this.eventPublisher.publishUserCreated(savedUser);
            return savedUser;
        });
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUserUseCase.js.map