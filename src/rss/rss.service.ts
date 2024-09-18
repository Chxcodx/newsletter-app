import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Organization } from '../organization/organization.entity';
import { Campaign } from '../campaign/campaign.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RssService {
  private parser: Parser;

  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {
    this.parser = new Parser();
  }

  async fetchAndGenerateCampaigns() {
    try {
      const organizations = await this.organizationRepository.find({
        where: { rss_feed_url: Not(IsNull()) },
      });

      for (const organization of organizations) {
        const feed = await this.parser.parseURL(organization.rss_feed_url);
        for (const item of feed.items) {
          const existingCampaign = await this.campaignRepository.findOne({
            where: { subject: item.title },
          });

          if (!existingCampaign) {
            const newCampaign = this.campaignRepository.create({
              subject: item.title,
              content: item.contentSnippet || item.content,
              organization,
              created_at: new Date(),
            });

            await this.campaignRepository.save(newCampaign);
          }
        }
      }
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching RSS feed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Cron('*/10 * * * *') // Runs every 10 minutes
  async handleCron() {
    await this.fetchAndGenerateCampaigns();
  }
}
