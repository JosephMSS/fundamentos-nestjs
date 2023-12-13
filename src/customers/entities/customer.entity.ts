import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities';
import { Order } from '../../orders/entities/order.entity';
@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  lastName: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  phone: string;
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
