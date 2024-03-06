import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/common';
import { CreateLinkRequest } from './dto/create-link.request';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateLinkRequest, @Req() req: any) {
    return this.linksService.createLink(request, req.cookies?.Authentication);
  }

  @Get()
  async getLinks() {
    return this.linksService.getLinks();
  }
}
