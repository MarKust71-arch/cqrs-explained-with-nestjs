// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Controller, Get } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { OrderEvent } from './order/order.events';

@Controller()
export class AppController {
  constructor(
    private readonly eventBus: EventBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async bid(): Promise<any> {
    const orderTransactionGUID = uuid.v4();
    // We are hard-coding values here
    // instead of collecting them from a request
    this.eventBus.publish(
      new OrderEvent(
        orderTransactionGUID,
        'Daniel Trimson',
        'Samsung LED TV',
        50000,
      ),
    );
    return { status: 'PENDING' };
  }
}
