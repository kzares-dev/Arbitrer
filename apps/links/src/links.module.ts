import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule, AuthModule } from '@app/common';
import { LinksController } from './links.controler';
import { LinksService } from './links.service';
import { LinksRepository } from './links.repository';
import { Link, LinkSchema } from './schemas/link.schema';
import { AUTH_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/links/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    RmqModule.register({
      name: AUTH_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
})
export class LinksModule {}
