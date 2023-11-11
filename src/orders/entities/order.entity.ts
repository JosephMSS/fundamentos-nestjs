import { Product } from '@src/products/entities';
import { User } from '@src/users/entities';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
