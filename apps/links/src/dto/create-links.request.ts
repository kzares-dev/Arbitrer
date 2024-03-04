import { IsString } from "class-validator";

export class CreateLinkRequest {
  @IsString()
  originalLink: string;

}
