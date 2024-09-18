import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Organization])],
  providers: [ListService],
  controllers: [ListController],
  exports: [ListService],
})
export class ListModule {}
