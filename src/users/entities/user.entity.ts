import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from '../enums';
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
  password: string;
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
}
