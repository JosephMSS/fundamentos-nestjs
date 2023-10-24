import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { config } from '@src/config';
import { Client } from 'pg';
import { DATABASE_PROVIDERS } from './database.enum';

const API_KEY = '12345634';
/**
 * When a module is global, it can be imported by any other module in the application.
 */
@Global()
@Module({
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
  exports: [DATABASE_PROVIDERS.API_KEY, DATABASE_PROVIDERS.PG],
})
export class DatabaseModule {}
