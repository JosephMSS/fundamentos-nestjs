import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities';
import { Order } from '@/orders';
import { ProductsService } from '@/products';
@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}
  private users: User[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: 'hashedpassword1',
      role: 'admin',
    },
    {
      id: 2,
      email: 'customer1@example.com',
      password: 'hashedpassword2',
      role: 'customer',
    },
    {
      id: 3,
      email: 'customer2@example.com',
      password: 'hashedpassword3',
      role: 'customer',
    },
    // Puedes agregar más objetos User según sea necesario
  ];
  randomId() {
    return Math.floor(Math.random() * 999);
  }
  create(createUserDto: CreateUserDto) {
    const user = {
      id: this.randomId(),
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((user) => user.id === id);
      this.users[index] = {
        ...user,
        ...updateUserDto,
      };
      return this.users[index];
    }
  }
  findOrdersByUser(id: number): Order[] {
    const user = this.findOne(id);
    const products = this.productsService.findAll();
    return [
      {
        date: new Date(),
        user,
        products,
      },
    ];
  }
  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    if (user) {
      this.users.splice(index, 1);
      return user;
    }
  }
}
