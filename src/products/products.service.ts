import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BrandsService } from '@src/brands/brands.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { BRAND_TABLE_NAME, Brand } from '@src/brands/entities';
import { Category } from '@src/categories/entities';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @Inject(BRAND_TABLE_NAME) private readonly brandsTableName: string,
    @Inject('API_KEY') private apiKey: string,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    if (createProductDto.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: createProductDto.brandId,
      });
      newProduct.brand = brand;
    }
    if (createProductDto.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(createProductDto.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(query) {
    const product = await this.productRepository.findOne({
      where: query,
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne({ id });
    if (updateProductDto.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: updateProductDto.brandId,
      });
      product.brand = brand;
    }
    if (updateProductDto.categoriesIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(updateProductDto.categoriesIds),
      });
      product.categories = categories;
    }
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne({ id });
    return this.productRepository.delete(id);
  }
}
