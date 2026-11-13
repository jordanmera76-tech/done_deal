import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
  console.log('Servidor NestJS corriendo en http://localhost:3000');
}
bootstrap();  */

// correr la base de datos en 




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Aumentar el límite del body parser para permitir imágenes grandes en Base64
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();