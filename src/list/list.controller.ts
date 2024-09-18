import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ListService } from './list.service';

@Controller('api/lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async createList(
    @Body('name') name: string,
    @Body('organizationId') organizationId: string,
    @Body('customFields') customFields?: Record<string, any>,
  ) {
    try {
      return await this.listService.createList(
        name,
        organizationId,
        customFields,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create list',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getLists(@Body('organizationId') organizationId: string) {
    try {
      return await this.listService.getLists(organizationId);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve lists',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateList(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('customFields') customFields?: Record<string, any>,
  ) {
    try {
      return await this.listService.updateList(id, name, customFields);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update list',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
