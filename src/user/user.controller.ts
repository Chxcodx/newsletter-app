import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    @Body('organizationId') organizationId: string,
  ) {
    try {
      return await this.userService.register(
        email,
        password,
        role,
        organizationId,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Registration failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.userService.login(email, password);
    } catch (error) {
      throw new HttpException(
        error.message || 'Login failed',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    try {
      return await this.userService.findUserById(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to retrieve user',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
