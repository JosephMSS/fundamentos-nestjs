import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    postgres: {
      password: process.env.POSTGRES_PASSWORD,
      db: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      port: +process.env.POSTGRES_DB_PORT || 5432,
      host: process.env.POSTGRES_DB_HOST,
      url: process.env.POSTGRES_DB_URL,
    },
  },
}));