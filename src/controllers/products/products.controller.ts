import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/')
  findAll(
    @Query('limit') limit = 1,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'Laptop',
  ) {
    return { message: `Brand=>${brand},Limit=> ${limit}, Offset=> ${offset}` };
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
  findOne(@Param('id') id: string) {
    return `Product id: ${id}`;
  }
  @Post('/')
  create(@Body() payload: any) {
    return {
      message: 'create',
      payload,
    };
  }
  @Put('/:id')
  update(@Body() payload: any, @Param('id') id: string) {
    return {
      message: `update id:${id}`,
      payload,
    };
  }
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return { message: `delete id:${id}` };
  }
}
