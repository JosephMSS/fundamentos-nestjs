import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from '@src/config';
import { Client } from 'pg';
import { DATABASE_PROVIDERS } from './database.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/products/entities';
import { User } from '@src/users/entities';
import { Customer } from '@src/customers/entities';
import { Brand } from '@src/brands/entities';
import { Category } from '@src/categories/entities';
import { Order } from '@src/orders/entities/order.entity';
import { OrderItem } from '@src/order-item/entities/order-item.entity';
const API_KEY = '12345634';
/**
 * When a module is global, it can be imported by any other module in the application.
 */
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, db, password, port, user } =
          configService.database.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: db,
          synchronize: false,
          entities: [
            Product,
            User,
            Customer,
            Brand,
            Category,
            Order,
            OrderItem,
          ],
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: DATABASE_PROVIDERS.API_KEY,
      useValue: API_KEY,
    },
    {
      provide: DATABASE_PROVIDERS.PG,
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, db, password, port } =
          configService.database.postgres;
        const client = new Client({
          user,
          host,
          database: db,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: [DATABASE_PROVIDERS.API_KEY, DATABASE_PROVIDERS.PG, TypeOrmModule],
})
export class DatabaseModule {}
