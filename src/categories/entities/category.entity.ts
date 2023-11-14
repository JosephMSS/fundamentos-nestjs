import { Product } from '../../products/entities';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
export const CATEGORY_TABLE_NAME = 'category';
@Entity({ name: CATEGORY_TABLE_NAME })
export class Category {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  description: string;
  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
