import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '@src/customers/entities';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = new Order();
    if (createOrderDto.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: createOrderDto.customerId,
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      order.customer = customer;
    }
    const newOrder = await this.orderRepository.save(order);
    return newOrder;
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  findOne(id: number) {
    const order = this.orderRepository.findOneBy({
      id,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (updateOrderDto.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: updateOrderDto.customerId,
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      order.customer = customer;
    }
    return await this.orderRepository.save(order);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.orderRepository.delete(id);
  }
}
