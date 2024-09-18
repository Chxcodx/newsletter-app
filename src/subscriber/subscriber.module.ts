import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { GpgController } from '../gpg/gpg.controller';
import { Subscriber } from './subscriber.entity';
import { Organization } from '../organization/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber, Organization])],
  controllers: [SubscriberController, GpgController],
  providers: [SubscriberService],
})
export class SubscriberModule {}
