import { Module } from '@nestjs/common';
import { GpgController } from './gpg.controller';
import { SubscriberService } from 'src/subscriber/subscriber.service';
import { Subscriber } from 'src/subscriber/subscriber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber, Organization])],
  controllers: [GpgController],
  providers: [SubscriberService],
})
export class GpgModule {}
