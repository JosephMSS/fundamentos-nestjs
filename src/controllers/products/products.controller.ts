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
  ParseIntPipe,
} from '@nestjs/common';
import { ParseIntPipe as CustomIntPipe } from 'src/common/parse-int/parse-int.pipe';
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
  findOne(@Param('id', CustomIntPipe) id: number) {
    console.log(typeof id);

    return this.productsService.finOne(id);
  }
  @Post('/')
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }
  @Put('/:id')
  update(@Body() payload: any, @Param('id', ParseIntPipe) id: number) {
    return this.productsService.update(payload, id);
  }
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
