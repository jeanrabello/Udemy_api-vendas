import Product from '../typeorm/entities/Product';
import { ProductsRepository as repository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await repository.find();

    return products;
  }
}

export default ListProductService;
