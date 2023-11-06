import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customersRepository.create(createCustomerDto);
    const newCustomer = await this.customersRepository.save(customer);
    return newCustomer;
  }

  async findAll() {
    const customers = await this.customersRepository.find();
    return customers;
  }

  async findOne(query) {
    const customer = await this.customersRepository.findOne({
      where: query,
    });
    if (!customer) {
      throw new NotFoundException(`Customer #${query.id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne({ id });
    this.customersRepository.merge(customer, updateCustomerDto);
    const updatedCustomer = await this.customersRepository.save(customer);
    return updatedCustomer;
  }

  async remove(id: number) {
    await this.findOne({ id });
    return await this.customersRepository.delete(id);
  }
}
