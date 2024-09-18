import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Campaign } from './campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/list/list.entity';
import { Organization } from 'src/organization/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, List, Organization])],
  providers: [CampaignService],
  controllers: [CampaignController],
  exports: [CampaignService],
})
export class CampaignModule {}
