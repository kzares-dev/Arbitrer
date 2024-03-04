import { Body, Controller, Get, Post } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkRequest } from './dto/create-links.request';

@Controller('/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  async createLink(@Body() request: CreateLinkRequest) {
    console.log(request)
    return this.linksService.createLink(request);
  }

  @Get()
  async getLinks() {
    return this.linksService.getLinks();
  }
}
