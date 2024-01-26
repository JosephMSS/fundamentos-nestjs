import { Customer } from '../../customers/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Exclude, Expose } from 'class-transformer';
@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;
  @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: false })
  @JoinColumn({
    name: 'customer_id',
    referencedColumnName: 'id',
  })
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order)
  @Exclude()
  items: OrderItem[];
  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item.product)
        .map((item) => {
          return {
            ...item.product,
            quantity: item.quantity,
            itemId: item.id,
          };
        });
    }
    return [];
  }
  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item.product)
        .reduce((sum, item) => {
          return sum + item.quantity * item.product.price;
        }, 0);
    }
    return 0;
  }
}
