import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '@src/brands/brands.module';
import { Product } from './entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
@Module({
  imports: [BrandsModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
