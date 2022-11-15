import AppError from '@shared/errors/AppError';
import User from '@modules/users/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { UsersRepository as repository } from '@modules/users/typeorm/repositories/UsersRepository';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await repository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid login information: email or password.', 401);
    }

    const decryptedPwd = await compare(password, user.password);

    if (!decryptedPwd) {
      throw new AppError('Invalid login information: email or password.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
