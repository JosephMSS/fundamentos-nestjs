import { Customer } from '../../customers/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;
  @ManyToOne(() => Customer, (customer) => customer.orders, { nullable: false })
  customer: Customer;
}
