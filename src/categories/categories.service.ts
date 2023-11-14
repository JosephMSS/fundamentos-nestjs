import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryService: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryService.create(createCategoryDto);
    return await this.categoryService.save(category);
  }

  async findAll() {
    const categories = await this.categoryService.find();
    return categories;
  }

  async findOne(query) {
    const category = await this.categoryService.findOne({
      where: query,
    });
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne({ id });
    this.categoryService.merge(category, updateCategoryDto);
    return await this.categoryService.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne({ id });
    return await this.categoryService.delete(category);
  }
}
