import { Controller, Post, Body } from '@nestjs/common';
import { AutomationService } from './automation.service';

@Controller('automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post('trigger/send-campaign')
  async triggerSendCampaign(
    @Body() body: { campaignId: string; organizationId: string },
  ) {
    try {
      await this.automationService.triggerSendCampaign(
        body.campaignId,
        body.organizationId,
      );
      return { message: 'Campaign trigger enqueued successfully' };
    } catch (error) {
      return { message: 'Error triggering campaign', error };
    }
  }

  @Post('trigger/rss-campaign')
  async triggerRssCampaign(@Body() body: { rssFeedUrl: string }) {
    try {
      await this.automationService.triggerRssCampaign(body.rssFeedUrl);
      return { message: 'RSS campaign trigger enqueued successfully' };
    } catch (error) {
      return { message: 'Error triggering RSS campaign', error };
    }
  }
}
