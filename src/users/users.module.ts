import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProductsModule } from '@src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { Customer } from '@src/customers';

@Module({
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
