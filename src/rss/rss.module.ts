import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { Organization } from '../organization/organization.entity';
import { Campaign } from '../campaign/campaign.entity';
import { OrganizationService } from 'src/organization/organization.service';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, Campaign])],
  controllers: [RssController],
  providers: [RssService, OrganizationService],
})
export class RssModule {}
