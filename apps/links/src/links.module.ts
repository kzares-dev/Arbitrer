import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from "@app/common"
import { MongooseModule } from '@nestjs/mongoose'
import { LinksRepository } from "./links.repository"
import { Link, LinkSchema }from './schemas/links.schema'
import * as Joi from "joi"

@Module({
  imports: [
    // instanciate the config service available to this container
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/links/.env'
    }),
    // initializing the database with the common database file in lib folder
    DatabaseModule,
    // calling the mongoose schema & register the link schema
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema}]),
  ],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository],
})
export class LinksModule {}
