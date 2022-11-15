import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository as repository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await repository.findOne({ where: { id: id } });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
