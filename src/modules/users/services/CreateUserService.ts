import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import { UsersRepository as repository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailAlreadyExists = await repository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email address already in use.');
    }

    const encryptedPwd = await hash(password, 8);

    const User = repository.create({
      name: name,
      email: email,
      password: encryptedPwd,
    });

    await repository.save(User);

    return User;
  }
}

export default CreateUserService;
