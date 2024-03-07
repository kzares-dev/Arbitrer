import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AUTH_SERVICE } from './constants/services';
import { CreateLinkRequest } from './dto/create-link.request';
import { LinksRepository } from './links.repository';
import { v4 as uuidv4 } from "uuid"

@Injectable()
export class LinksService {
  constructor(
    private readonly linksRepository: LinksRepository,
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
  ) { }

  async createLink(request: CreateLinkRequest, authentication: string) {
    const session = await this.linksRepository.startTransaction();


    try {

      // first attempt to create a link
      const newLink = {
        userId: request.userId,
        shortenedUrl: uuidv4(),
        url: request.url,
      }

      const link = await this.linksRepository.create(newLink, { session });
      // then add the link id to the user pool


      await lastValueFrom(
        this.authClient.emit('link_created', {
         data: {
          userId: request.userId,
          linkId: link._id
         },
          authentication
        }, ),
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

