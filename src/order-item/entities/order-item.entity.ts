import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  a: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
