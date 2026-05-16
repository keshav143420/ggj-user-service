import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/CreateUserUseCase';
export declare class UserController {
    private createUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase);
    createUser(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map