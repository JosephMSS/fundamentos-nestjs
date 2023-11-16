import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '@src/brands/brands.module';
import { BRAND_TABLE_NAME, Brand } from '@src/brands/entities';
import { Product } from './entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Category } from '@src/categories/entities';
@Module({
  imports: [BrandsModule, TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      useValue: BRAND_TABLE_NAME,
      provide: BRAND_TABLE_NAME,
    },
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
