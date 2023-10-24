import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '@src/config/config';
import { Client } from 'pg';
import { DATABASE_PROVIDERS } from './database/database.enum';
@Injectable()
export class AppService {
  constructor(
    @Inject(DATABASE_PROVIDERS.API_KEY) private apiKey: string,
    @Inject(DATABASE_PROVIDERS.PG) private client: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello(): string {
    const dbName = this.configService.database.postgres.db;
    return `Hello World! ${dbName}`;
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.client.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
