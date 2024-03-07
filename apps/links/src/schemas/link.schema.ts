import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Schema as MongooseSchema } from 'mongoose'; 


@Schema({ versionKey: false })
export class Link extends AbstractDocument {
  @Prop()
  url: string;

  @Prop()
  shortenedUrl: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  userId: MongooseSchema.Types.ObjectId;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
