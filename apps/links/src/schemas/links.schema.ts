import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common"


@Schema({ versionKey: false })
export class Link extends AbstractDocument {

    @Prop()
    originalLink: string;

    @Prop()
    shortenLink: string;

}

export const LinkSchema = SchemaFactory.createForClass(Link);