import dataSource from '@shared/typeorm';
import User from '../entities/User';

export const UsersRepository = dataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  },

  async findById(id: string): Promise<User | null> {
    return await this.findOne({
      where: {
        id: id,
      },
    });
  },

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({
      where: {
        email: email,
      },
    });
  },
});
