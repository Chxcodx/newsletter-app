import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SubscriberService } from './subscriber.service';

@Controller('api/subscribers')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  async addSubscriber(
    @Body('email') email: string,
    @Body('organizationId') organizationId: string,
    @Body('customFields') customFields?: Record<string, any>,
    @Body('gpgPublicKey') gpgPublicKey?: string,
  ) {
    try {
      return await this.subscriberService.addSubscriber(
        email,
        organizationId,
        customFields,
        gpgPublicKey,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to add subscriber',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getSubscribers(
    @Query('organizationId') organizationId: string | null,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.subscriberService.getSubscribers(organizationId, page, limit);
  }

  @Put(':id')
  async updateSubscriber(
    @Param('id') id: string,
    @Body('customFields') customFields?: Record<string, any>,
    @Body('gpgPublicKey') gpgPublicKey?: string,
    @Body('email') email?: string,
  ) {
    try {
      return await this.subscriberService.updateSubscriber(
        id,
        customFields,
        gpgPublicKey,
        email,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update subscriber',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
