import { Controller, Get } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller()
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  getHello(): string {
    return this.linksService.getHello();
  }
}
