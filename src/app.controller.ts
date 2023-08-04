import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('new')
  newEndpoint() {
    return 'new Endpoint';
  }
  @Get('/new-with-slash')
  newWithSlash() {
    return 'new Endpoint with slash';
  }
  @Get('products')
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
  @Get('products/filter')
  filter() {
    return `Product filter`;
  }
  @Get('products/:id')
  findOne(@Param('id') id: string) {
    return `Product id: ${id}`;
  }
  @Get('categories/:id/products/:productId')
  categories(@Param('id') id: string, @Param('productId') productId: string) {
    return ` Category : ${id}, Product id: ${productId}`;
  }
}
