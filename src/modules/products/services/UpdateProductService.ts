import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository as repository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name?: string;
  price?: number | null;
  quantity?: number | null;
}

class UpdateProductService {
  public async execute({
    id,
    name = '',
    price = null,
    quantity = null,
  }: IRequest): Promise<Product> {
    const product = await repository.findOne({ where: { id: id } });

    if (!product) {
      throw new AppError('Product not found');
    }

    const productAlreadyExists = await repository.findByName(name);

    if (productAlreadyExists && name !== product.name) {
      throw new AppError('Product already exists');
    }

    product.name = name ? name : product.name;
    product.price = price ? price : product.price;
    product.quantity = quantity ? quantity : product.quantity;

    await repository.save(product);

    return product;
  }
}

export default UpdateProductService;
