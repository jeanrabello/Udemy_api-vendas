import { ProductsRepository as repository } from '../typeorm/repositories/ProductsRepository';

export const ValidateProductExistenceByName = async (
  name: string,
): Promise<boolean> => {
  const productAlreadyExists = await repository.findByName(name);

  if (productAlreadyExists) {
    return true;
  }

  return false;
};
