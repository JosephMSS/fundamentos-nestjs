import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
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
  })
  image: string;
}
