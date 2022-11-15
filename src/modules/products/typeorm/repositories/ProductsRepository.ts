import dataSource from '@shared/typeorm';
import Product from '../entities/Product';

export const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  },
});
