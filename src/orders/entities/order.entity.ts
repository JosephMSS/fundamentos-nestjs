import { Product } from '@src/products';
import { User } from '@src/users';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
