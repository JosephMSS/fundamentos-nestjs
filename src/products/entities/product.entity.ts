import { Category } from '../../categories/entities';
import { Brand } from '../../brands/entities';

import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
/**
 * De esta manera indexamos columnas de manera conjunta
 */
// @Index(['price', 'stock'])
@Entity({ name: 'products' })
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
  @Exclude()
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_has_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
