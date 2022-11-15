import User from '../typeorm/entities/User';
import { UsersRepository as repository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const users = await repository.find();

    return users;
  }
}

export default ListUserService;
