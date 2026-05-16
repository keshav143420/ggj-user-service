import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/CreateUserUseCase';

export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const user = await this.createUserUseCase.execute({ username, email, password });
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (error: any) {
      if (error.message === 'Email already in use' || error.message === 'Username already in use') {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
