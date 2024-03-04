import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @EventPattern('oder_created')
  async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext){
    this.billingService.bill(data);
  }

}
