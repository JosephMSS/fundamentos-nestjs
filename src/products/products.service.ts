import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandsService } from '@src/brands/brands.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { BRAND_TABLE_NAME } from '@src/brands/entities';
@Injectable()
export class ProductsService {
  constructor(
    private readonly brandService: BrandsService,
    @Inject(BRAND_TABLE_NAME) private readonly brandsTableName: string,
    @Inject('API_KEY') private apiKey: string,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    if (createProductDto.brandId) {
      const brand = await this.brandService.findOne({
        id: createProductDto.brandId,
      });
      newProduct.brand = brand;
    }
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: [this.brandsTableName],
    });
  }

  async findOne(query) {
    const product = await this.productRepository.findOne({
      where: query,
      relations: [this.brandsTableName],
    });
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne({ id });
    if (updateProductDto.brandId) {
      const brand = await this.brandService.findOne({
        id: updateProductDto.brandId,
      });
      product.brand = brand;
    }
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne({ id });
    return this.productRepository.delete(id);
  }
}
