import { User } from '../../users/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class Customer {
  @PrimaryColumn()
  id: string;
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
}
