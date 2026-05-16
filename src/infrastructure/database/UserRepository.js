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
exports.UserRepository = void 0;
const User_1 = require("../../domain/User");
const UserEntity_1 = require("./UserEntity");
class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    mapToDomain(entity) {
        return new User_1.User({
            id: entity.id,
            username: entity.username,
            email: entity.email,
            passwordHash: entity.passwordHash,
            createdAt: entity.createdAt,
        });
    }
    mapToEntity(domain) {
        const entity = new UserEntity_1.UserEntity();
        if (domain.id)
            entity.id = domain.id;
        entity.username = domain.username;
        entity.email = domain.email;
        entity.passwordHash = domain.passwordHash;
        if (domain.createdAt)
            entity.createdAt = domain.createdAt;
        return entity;
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.mapToEntity(user);
            const savedEntity = yield this.repository.save(entity);
            return this.mapToDomain(savedEntity);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.repository.findOneBy({ email });
            return entity ? this.mapToDomain(entity) : null;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.repository.findOneBy({ username });
            return entity ? this.mapToDomain(entity) : null;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map