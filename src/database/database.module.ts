import { Module, Global } from '@nestjs/common';
const API_KEY = '12345634';
/**
 * When a module is global, it can be imported by any other module in the application.
 */
@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
