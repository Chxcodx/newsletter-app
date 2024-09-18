import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { ListModule } from './list/list.module';
import { CampaignModule } from './campaign/campaign.module';
import { RssModule } from './rss/rss.module';
import { Organization } from './organization/organization.entity';
import { Campaign } from './campaign/campaign.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { GpgModule } from './gpg/gpg.module';
import { AutomationModule } from './automation/automation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'newsletter_app',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule,
    OrganizationModule,
    SubscriberModule,
    ListModule,
    CampaignModule,
    RssModule,
    TypeOrmModule.forFeature([Organization, Campaign]),
    ScheduleModule.forRoot(),
    GpgModule,
    AutomationModule,
  ],
})
export class AppModule {}
