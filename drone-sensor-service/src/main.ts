import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cors = process.env.CORS_ENABLED === 'true';
  const app = await NestFactory.create(AppModule, { cors });
  await app.listen(3000);
}
bootstrap();
