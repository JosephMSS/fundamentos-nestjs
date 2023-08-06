import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from 'src/services';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  findAll(
    @Query('limit') limit = 1,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'Laptop',
  ) {
    return this.productsService.findAll();
  }
  /**
   * Colocar las rutas estáticas al principio
   * @returns string
   */
  @Get('/filter')
  filter() {
    return { message: `Product filter` };
  }
  @Get('/:id')
  @HttpCode(HttpStatus.FOUND)
  findOne(@Param('id') id: string) {
    return this.productsService.finOne(+id);
  }
  @Post('/')
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }
  @Put('/:id')
  update(@Body() payload: any, @Param('id') id: string) {
    return this.productsService.update(payload, +id);
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
