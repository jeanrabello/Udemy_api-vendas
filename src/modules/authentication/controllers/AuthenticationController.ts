import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class AuthenticationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createUser = new CreateSessionsService();

    const user = await createUser.execute({
      email: email,
      password: password,
    });

    return res.json(user);
  }
}
