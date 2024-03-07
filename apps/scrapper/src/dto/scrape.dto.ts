import { IsUrl } from 'class-validator';

export class Scrape {
  @IsUrl()
  url: string;
}
