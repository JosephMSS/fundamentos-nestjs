import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Roles } from '../enums';
import { Customer } from '../../customers/entities';
@Entity()
export class User {
  @PrimaryColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string; //TODO: encrypt password
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    enum: Roles,
  })
  role: string;
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn() // la que carga con la relación es la que debe tener el join column
  customer: Customer;
}
