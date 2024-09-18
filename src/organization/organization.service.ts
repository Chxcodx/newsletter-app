import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createOrganization(name: string) {
    try {
      const existingOrg = await this.organizationRepository.findOne({
        where: { name },
      });
      if (existingOrg) {
        throw new HttpException(
          'Organization already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newOrganization = this.organizationRepository.create({ name });
      return await this.organizationRepository.save(newOrganization);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating organization',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllOrganizations() {
    try {
      const organizations = await this.organizationRepository.find();
      return organizations;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error retrieving organizations',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async setRssFeed(organizationId: string, rssFeedUrl: string) {
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });

      if (!organization)
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);

      organization.rss_feed_url = rssFeedUrl;
      await this.organizationRepository.save(organization);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error setting RSS feed URL',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
