import { Product } from '@/products';
import { User } from '@/users';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
