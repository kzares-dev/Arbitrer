import { Inject, Injectable } from "@nestjs/common";
import { CreateLinkRequest } from "./dto/create-links.request";
import { LinksRepository } from "./links.repository";
import { v4 as uuidv4 } from "uuid";
import { BILLING_SERVICE } from "./constants/services";
import { ClientGrpcProxy, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class LinksService {
  constructor(
    private readonly linksRepository: LinksRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy
  ) {}

  
  async createLink(request: CreateLinkRequest) {
    const session = await this.linksRepository.startTransaction();

    const newLink = {
      originalLink: request.originalLink,
      shortenLink: uuidv4()
    }

    try {
      const link = await this.linksRepository.create(newLink, { session });
      await lastValueFrom(
        this.billingClient.emit('link_created', {
          request,
        }),
      );
      await session.commitTransaction();
      return link;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return this.linksRepository.find({});
  }

  // ? This endpoint does not make any diference
  async getLinks() {
    return this.linksRepository.find({});
  }
}
