import { Category } from '../../categories/entities';
import { Brand } from '../../brands/entities';

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
/**
 * De esta manera indexamos columnas de manera conjunta
 */
// @Index(['price', 'stock'])
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;
  @Index() // De esta manera indexamos columnas de manera individual
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  price: number;
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;
  @Column({
    type: 'varchar',
    nullable: true,
  })
  image: string;
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
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
