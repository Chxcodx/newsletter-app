// rss.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationService } from '../organization/organization.service';

@Controller('rss')
export class RssController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post(':organizationId/set-feed')
  async setRssFeed(
    @Param('organizationId') organizationId: string,
    @Body('rssFeedUrl') rssFeedUrl: string,
  ) {
    try {
      await this.organizationService.setRssFeed(organizationId, rssFeedUrl);
      return { message: 'RSS Feed URL updated successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update RSS Feed URL',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
