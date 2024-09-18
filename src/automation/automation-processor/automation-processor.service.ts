import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('automation') // Processor is for the 'automation' queue
export class AutomationProcessor {
  @Process('send-campaign')
  async handleCampaign(job: Job) {
    try {
      const { campaignId, organizationId } = job.data;
      console.log(
        `Sending campaign ${campaignId} for organization ${organizationId}`,
      );
      // Add logic to send the campaign (e.g., via SMTP or a third-party service)
    } catch (error) {
      console.error('Error processing send-campaign job', error);
    }
  }

  @Process('rss-campaign')
  async handleRssCampaign(job: Job) {
    try {
      const { rssFeedUrl } = job.data;
      console.log(`Processing RSS feed: ${rssFeedUrl}`);
      // Add to fetch RSS feed data and create a campaign based on it
    } catch (error) {
      console.error('Error processing rss-campaign job', error);
    }
  }
}
