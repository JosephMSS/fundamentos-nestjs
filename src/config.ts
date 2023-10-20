import { registerAs } from '@nestjs/config';
export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: +process.env.DATABASE_PORT || 5432,
  },
  apiKey: process.env.API_KEY,
}));
