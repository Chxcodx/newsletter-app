import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';

@Controller('api/campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(
    @Body('subject') subject: string,
    @Body('content') content: string,
    @Body('listId') listId: string,
    @Body('organizationId') organizationId: string,
  ) {
    try {
      return await this.campaignService.createCampaign(
        subject,
        content,
        listId,
        organizationId,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getCampaigns(@Body('organizationId') organizationId: string) {
    try {
      return await this.campaignService.getCampaigns(organizationId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve campaigns',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/send')
  async sendCampaign(@Param('id') campaignId: string) {
    try {
      return await this.campaignService.sendCampaign(campaignId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to send campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
