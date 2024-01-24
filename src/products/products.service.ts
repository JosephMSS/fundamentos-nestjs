import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BRAND_TABLE_NAME, Brand } from '@src/brands/entities';
import { Category } from '@src/categories/entities';
import { In, Repository, FindOptionsWhere, Between } from 'typeorm';
import { CreateProductDto, FilterProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
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

  async findAll(params?: FilterProductDto) {
    if (params) {
      let where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where = {
          ...where,
          price: Between(minPrice, maxPrice),
        };
      }
      return await this.productRepository.find({
        relations: ['brand'],
        where,
        skip: offset,
        take: limit,
      });
    }
    return await this.productRepository.find({
      relations: ['brand'],
    });
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
    this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(product);
  }
  async updateCategoryByProduct(productId: number, categoryId) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    if (!category) {
      throw new NotFoundException('Category not Found');
    }
    product.categories.push(category);
    return await this.productRepository.save(product);
  }
  async deleteCategoryByProduct(productId: number, categoryId) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    if (!product) {
      throw new NotFoundException('Product not Found');
    }
    if (!category) {
      throw new NotFoundException('Category not Found');
    }
    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    return await this.productRepository.save(product);
  }
  async remove(id: number) {
    await this.findOne({ id });
    return this.productRepository.delete(id);
  }
}
