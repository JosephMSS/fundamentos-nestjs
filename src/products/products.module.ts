import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandsModule } from '@src/brands/brands.module';
import { BRAND_TABLE_NAME } from '@src/brands/entities';
import { Product } from './entities';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
@Module({
  imports: [BrandsModule, TypeOrmModule.forFeature([Product])],
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
