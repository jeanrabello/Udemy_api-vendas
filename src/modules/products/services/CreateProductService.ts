import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository as repository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productAlreadyExists = await repository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const product = repository.create({
      name: name,
      price: price,
      quantity: quantity,
    });

    await repository.save(product);

    return product;
  }
}

export default CreateProductService;
