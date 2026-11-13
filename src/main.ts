import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  
  // ¡Vital para que tu Frontend en Vercel se pueda comunicar con este Backend!
  app.enableCors(); 

  // Puerto dinámico asignado por Render/Railway o 3000 por defecto
  const port = Number((globalThis as any).process?.env?.PORT) || 3000;
await app.listen(port);
}
bootstrap();