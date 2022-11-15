import fs from 'fs';
import path from 'path';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { UsersRepository as repository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: IRequest): Promise<User> {
    const user = await repository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    if (avatarFilename === '') {
      throw new AppError('Avatar not informed by the user.');
    }

    user.avatar = avatarFilename;
    await repository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
