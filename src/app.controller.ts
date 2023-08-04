import { Controller, Get, Param } from '@nestjs/common';
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
  @Get('products/:id')
  task(@Param('id') id: string) {
    return `Product id: ${id}`;
  }
  @Get('categories/:id/products/:productId')
  categories(@Param('id') id: string, @Param('productId') productId: string) {
    return ` Category : ${id}, Product id: ${productId}`;
  }
}
