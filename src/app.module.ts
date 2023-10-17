import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    OrdersModule,
    CustomersModule,
    CategoriesModule,
    BrandsModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: 'TASKS',
      useFactory: async (httpService: HttpService) => {
        /**
         * We use use factory for connections to external services like databases or http requests,
         * isn't a good practice to use useFactory for http requests
         */
        const req = httpService.get(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const data = await firstValueFrom(req);
        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
