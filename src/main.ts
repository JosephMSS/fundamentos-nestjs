import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Store')
    .setDescription('The store API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  SwaggerModule.setup('docs', app, document);
  /**
   * Esta configuración no permite que el si hay datos extra,
   * algún typo i datos maliciosos estos no puedan ser admitidos
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(3000);
}
bootstrap();
