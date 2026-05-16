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
exports.UserController = void 0;
class UserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const user = yield this.createUserUseCase.execute({ username, email, password });
                res.status(201).json({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                });
            }
            catch (error) {
                if (error.message === 'Email already in use' || error.message === 'Username already in use') {
                    res.status(409).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Internal server error' });
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map