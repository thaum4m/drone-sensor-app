import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './sensors/socket-io-adapter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('main');
  const configService = new ConfigService();

  const cors = configService.get('CORS_ENABLED', false);
  const appPort = configService.get('APP_PORT', 3000);
  logger.debug(`CORS_ENABLED: ${cors}`);
  logger.debug(`APP_PORT: ${appPort}`);

  const app = await NestFactory.create(AppModule, { cors });
  // app.get(ConfigService) throws error so using ConfigService directly.  
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(appPort);  
}
bootstrap();
