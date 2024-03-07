import { NestFactory } from '@nestjs/core';
import { ScrapperModule } from './scrapper.module';

async function bootstrap() {
  const app = await NestFactory.create(ScrapperModule);
  await app.listen(3002);
}
bootstrap();
