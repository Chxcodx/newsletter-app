import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './list.entity';
import { Organization } from '../organization/organization.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async createList(
    name: string,
    organizationId: string,
    customFields?: Record<string, any>,
  ) {
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!organization)
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);

      const newList = this.listRepository.create({
        name,
        organization,
        custom_fields: customFields,
      });

      return await this.listRepository.save(newList);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error creating list',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLists(organizationId: string) {
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!organization)
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);

      return await this.listRepository.find({
        where: { organization: { id: organizationId } },
        relations: ['organization'],
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Error retrieving lists',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateList(
    id: string,
    name?: string,
    customFields?: Record<string, any>,
  ) {
    try {
      const list = await this.listRepository.findOne({ where: { id } });
      if (!list)
        throw new HttpException('List not found', HttpStatus.NOT_FOUND);

      if (name) list.name = name;

      if (customFields) list.custom_fields = customFields;

      return await this.listRepository.save(list);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating list',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
