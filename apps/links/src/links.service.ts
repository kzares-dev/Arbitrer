import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { BILLING_SERVICE } from './constants/services';
import { CreateLinkRequest } from './dto/create-link.request';
import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  constructor(
    private readonly linksRepository: LinksRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async createLink(request: CreateLinkRequest, authentication: string) {
    const session = await this.linksRepository.startTransaction();

    console.log(authentication)

    try {
      const link = await this.linksRepository.create(request, { session });
      
      await lastValueFrom(
        this.billingClient.emit('link_created', {
          request,
          Authentication: authentication,
        }),
      );
      await session.commitTransaction();
      return link;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getLinks() {
    return this.linksRepository.find({});
  }
}
