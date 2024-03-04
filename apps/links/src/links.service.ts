import { Inject, Injectable } from "@nestjs/common";
import { CreateLinkRequest } from "./dto/create-links.request";
import { LinksRepository } from "./links.repository";
import { v4 as uuidv4 } from "uuid";
import { BILLING_SERVICE } from "./constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class LinksService {
  constructor(
    private readonly linksRepository: LinksRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

  async createLink(request: CreateLinkRequest) {
    const session = await this.linksRepository.startTransaction();

    try {
      // first we generate a new uuid, then we index it to the original link
      const generatedLink = {
        originalLink: request.originalLink,
        shortenLink: uuidv4(),
      };
      const link = this.linksRepository.create(generatedLink, { session });
      await lastValueFrom(
        this.billingClient.emit('link_created', {
          request,
        }),
      );
      await session.commitTransaction();
      return link

    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  // ? This endpoint does not make any diference
  async getLinks() {
    return this.linksRepository.find({});
  }
}
