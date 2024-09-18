import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { List } from '../list/list.entity';
import { Organization } from '../organization/organization.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createCampaign(
    subject: string,
    content: string,
    listId: string,
    organizationId: string,
  ) {
    try {
      const list = await this.listRepository.findOne({ where: { id: listId } });
      const organization = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });

      if (!list || !organization) {
        throw new HttpException(
          'List or Organization not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const campaign = this.campaignRepository.create({
        subject,
        content,
        list,
        organization,
      });

      return await this.campaignRepository.save(campaign);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCampaigns(organizationId: string) {
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!organization)
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);

      return await this.campaignRepository.find({
        where: { organization: { id: organizationId } },
        relations: ['organization'],
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Error retrieving campaigns',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendCampaign(campaignId: string) {
    try {
      const campaign = await this.campaignRepository.findOne({
        where: { id: campaignId },
        relations: ['list'],
      });
      if (!campaign)
        throw new HttpException('Campaign not found', HttpStatus.NOT_FOUND);

      // Here, integrate with email service
      // For now, l just return the campaign details as if it's "sent."
      return {
        message: `Campaign "${campaign.subject}" sent to ${campaign.list.name}`,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error sending campaign',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
