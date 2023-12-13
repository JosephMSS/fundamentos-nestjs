import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { NotFoundError } from 'rxjs';
import { Customer } from '@src/customers/entities';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
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

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
