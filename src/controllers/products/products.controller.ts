import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/')
  findAll(
    @Query('limit') limit = 1,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'Laptop',
  ) {
    return `Brand=>${brand},Limit=> ${limit}, Offset=> ${offset}`;
  }
  /**
   * Colocar las rutas estáticas al principio
   * @returns string
   */
  @Get('/filter')
  filter() {
    return `Product filter`;
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return `Product id: ${id}`;
  }
}
