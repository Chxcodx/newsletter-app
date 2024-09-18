import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { SubscriberService } from '../subscriber/subscriber.service';

@Controller('api/gpg')
export class GpgController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post('upload')
  async uploadGpgKey(
    @Body('subscriberId') subscriberId: string,
    @Body('gpgPublicKey') gpgPublicKey: string,
  ) {
    try {
      return await this.subscriberService.uploadGpgKey(
        subscriberId,
        gpgPublicKey,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to upload GPG public key',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getGpgKey(@Param('id') subscriberId: string) {
    try {
      return await this.subscriberService.getGpgKey(subscriberId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve GPG public key',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
