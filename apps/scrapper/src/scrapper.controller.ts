import { Body, Controller,  Post } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { Scrape } from './dto/scrape.dto';

@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Post()
  async launchScrapperToYoutube(@Body() request: Scrape ) {
    return this.scrapperService.scrapeYoutube(request);
  }
}
