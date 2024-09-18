import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AutomationService {
  constructor(@InjectQueue('automation') private automationQueue: Queue) {}

  async triggerSendCampaign(campaignId: string, organizationId: string) {
    try {
      await this.automationQueue.add('send-campaign', {
        campaignId,
        organizationId,
      });
    } catch (error) {
      console.error('Failed to enqueue send-campaign job', error);
    }
  }

  async triggerRssCampaign(rssFeedUrl: string) {
    try {
      await this.automationQueue.add('rss-campaign', { rssFeedUrl });
    } catch (error) {
      console.error('Failed to enqueue rss-campaign job', error);
    }
  }
}
