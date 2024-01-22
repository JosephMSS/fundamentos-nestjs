import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
import { Order } from '@src/orders/entities/order.entity';
import { Product } from '@src/products/entities';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(createOrderItemDto: CreateOrderItemDto) {
    const order = await this.orderRepository.findOneBy({
      id: createOrderItemDto.orderId,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const product = await this.productRepository.findOneBy({
      id: createOrderItemDto.productId,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    //TODO: update the product quantity
    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.product = product;
    orderItem.quantity = createOrderItemDto.quantity;
    return await this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, _updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
