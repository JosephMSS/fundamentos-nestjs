import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
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
  async create(createProductDto: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = createProductDto.name;
    // newProduct.description = createProductDto.description;
    // newProduct.price = createProductDto.price;
    // newProduct.stock = createProductDto.stock;
    // newProduct.image = createProductDto.image;
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(query) {
    const product = await this.productRepository.findOne({
      where: query,
    });
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne({ id });
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne({ id });
    return this.productRepository.delete(id);
  }
}
