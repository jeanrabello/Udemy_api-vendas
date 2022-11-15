import AppError from '@shared/errors/AppError';
import { ProductsRepository as repository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await repository.findOne({ where: { id: id } });

    if (!product) {
      throw new AppError('Product not found');
    }

    await repository.remove(product);
  }
}

export default DeleteProductService;
