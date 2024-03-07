import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Schema } from 'mongoose';

export class CreateLinkRequest {
  @IsString()
  url: string;

  @IsString()
  userId: Schema.Types.ObjectId;
}
