import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Organization } from 'src/organization/organization.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    role: string,
    organizationId?: string,
  ) {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email },
      });
      if (userExists) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      if (organizationId) {
        const organization = await this.organizationRepository.findOne({
          where: { id: organizationId },
        });
        if (!organization) {
          throw new HttpException(
            'Organization not found',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const salt = bcrypt.genSaltSync(10);
      const password_hash = bcrypt.hashSync(password, salt);
      const newUser = this.userRepository.create({
        email,
        password_hash,
        role,
        organizationId,
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error during registration',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const payload = { email: user.email, sub: user.id };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error during login',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserById(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching user details',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
