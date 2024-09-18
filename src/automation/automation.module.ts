import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AutomationProcessor } from './automation-processor/automation-processor.service';
import { AutomationService } from './automation.service';
import { AutomationController } from './automation.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'automation',
    }),
  ],
  providers: [AutomationProcessor, AutomationService],
  exports: [AutomationService],
  controllers: [AutomationController],
})
export class AutomationModule {}
