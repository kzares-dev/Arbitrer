import { NestFactory } from "@nestjs/core";
import { LinksModule } from "./links.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(LinksModule);

  app.useGlobalPipes(new ValidationPipe());
  // serving in the port saved at .env file
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
