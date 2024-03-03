import { NestFactory } from '@nestjs/core';
import { LinksModule } from './links.module';

async function bootstrap() {
  const app = await NestFactory.create(LinksModule);
  await app.listen(3000);
}
bootstrap();
