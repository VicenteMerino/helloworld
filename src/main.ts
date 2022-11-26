import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerErrorFilter } from './server-error/server-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ServerErrorFilter());
  await app.listen(3000);
}
bootstrap();
