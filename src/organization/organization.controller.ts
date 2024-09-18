import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('api/organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async createOrganization(@Body('name') name: string) {
    try {
      return await this.organizationService.createOrganization(name);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create organization',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getAllOrganizations() {
    try {
      return await this.organizationService.findAllOrganizations();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve organizations',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
