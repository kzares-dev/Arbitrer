import { Injectable } from '@nestjs/common';

@Injectable()
export class LinksService {
  getHello(): string {
    return 'Hello World!';
  }
}
