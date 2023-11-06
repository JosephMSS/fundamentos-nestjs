import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { Order } from '@src/orders';
import { ProductsService } from '@src/products';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '@src/customers';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}
  randomId() {
    return Math.floor(Math.random() * 999);
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    const userList = await this.usersRepository.find();
    return userList;
  }

  findOne(query) {
    const user = this.usersRepository.findOne({
      where: query,
    });
    if (!user) {
      throw new NotFoundException(`User #${query.id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne({ id });
    this.usersRepository.merge(user, updateUserDto);
    this.usersRepository.save(user);
  }
  async findOrdersByUser(id: number): Promise<Order[]> {
    const user = await this.findOne({ id });
    const products = await this.productsService.findAll();
    return [
      {
        date: new Date(),
        user,
        products,
      },
    ];
  }
  async remove(id: number) {
    await this.findOne({ id });
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
