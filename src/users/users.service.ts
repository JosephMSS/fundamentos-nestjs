import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from '@src/customers/customers.service';
import { Order } from '@src/orders/entities/order.entity';
import { ProductsService } from '@src/products/products.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    private customersService: CustomersService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  randomId() {
    return Math.floor(Math.random() * 999);
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    if (createUserDto.customerId) {
      const customer = await this.customersService.findOne({
        id: createUserDto.customerId,
      });
      newUser.customer = customer;
    }
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    const userList = await this.usersRepository.find({
      relations: ['customer'],
    });
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
  async findOrdersByUser(id: number) {
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
