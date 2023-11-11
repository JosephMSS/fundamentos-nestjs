import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  async create(createBrandDto: CreateBrandDto) {
    const newBrand = this.brandRepository.create(createBrandDto);
    return await this.brandRepository.save(newBrand);
  }

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(query) {
    const brand = await this.brandRepository.findOne({
      where: query,
      relations: ['products'],
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.findOne({ id });
    this.brandRepository.merge(brand, updateBrandDto);
    return await this.brandRepository.save(brand);
  }

  async remove(id: number) {
    await this.findOne({ id });
    return this.brandRepository.delete(id);
  }
}
