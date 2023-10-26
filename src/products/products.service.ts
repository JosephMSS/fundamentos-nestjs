import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 0,
      name: 'Camisa 1',
      description: 'lorem lorem lorem',
      price: 1000,
      stock: 100,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
    {
      id: 1,
      name: 'Camisa 2',
      description: 'lorem lorem lorem',
      price: 1000,
      stock: 100,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    console.log(
      '🚀 ~ file: products.service.ts:29 ~ ProductsService ~ create ~ this.apiKey:',
      this.apiKey,
    );
    return 'This action adds a new product';
  }

  async findAll() {
    return await this.productRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
