import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from './subscriber.entity';
import { Organization } from '../organization/organization.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async addSubscriber(
    email: string,
    organizationId: string,
    customFields?: Record<string, any>,
    gpgPublicKey?: string,
  ) {
    try {
      const organization = await this.organizationRepository.findOne({
        where: { id: organizationId },
      });
      if (!organization)
        throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);

      const subscriberExists = await this.subscriberRepository.findOne({
        where: { email, organization },
      });
      if (subscriberExists) {
        throw new HttpException(
          'Subscriber already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newSubscriber = this.subscriberRepository.create({
        email,
        organization,
        custom_fields: customFields,
        gpg_public_key: gpgPublicKey,
      });
      return await this.subscriberRepository.save(newSubscriber);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error adding subscriber',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSubscribers(
    organizationId: string | null,
    page: number = 1,
    limit: number = 10,
  ) {
    try {
      const queryBuilder =
        this.subscriberRepository.createQueryBuilder('subscriber');

      if (organizationId) {
        queryBuilder.andWhere('subscriber.organizationId = :organizationId', {
          organizationId,
        });
      }
      queryBuilder.skip((page - 1) * limit).take(limit);
      const [subscribers, total] = await queryBuilder.getManyAndCount();
      return {
        data: subscribers,
        total,
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error fetching subscribers',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateSubscriber(
    id: string,
    customFields?: Record<string, any>,
    gpgPublicKey?: string,
    email?: string,
  ) {
    try {
      const subscriber = await this.subscriberRepository.findOne({
        where: { id },
      });
      if (!subscriber)
        throw new HttpException('Subscriber not found', HttpStatus.NOT_FOUND);
      if (customFields) subscriber.custom_fields = customFields;
      if (email) subscriber.email = email;
      if (gpgPublicKey) subscriber.gpg_public_key = gpgPublicKey;

      return await this.subscriberRepository.save(subscriber);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error updating subscriber',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadGpgKey(subscriberId: string, gpgPublicKey: string) {
    try {
      const subscriber = await this.subscriberRepository.findOne({
        where: { id: subscriberId },
      });

      if (!subscriber)
        throw new HttpException('Subscriber not found', HttpStatus.NOT_FOUND);

      subscriber.gpg_public_key = gpgPublicKey;

      return await this.subscriberRepository.save(subscriber);
    } catch (error) {
      throw new HttpException(
        error.message || 'Error uploading GPG public key',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getGpgKey(subscriberId: string) {
    try {
      const subscriber = await this.subscriberRepository.findOne({
        where: { id: subscriberId },
      });

      if (!subscriber)
        throw new HttpException('Subscriber not found', HttpStatus.NOT_FOUND);

      return { gpg_public_key: subscriber.gpg_public_key };
    } catch (error) {
      throw new HttpException(
        error.message || 'Error retrieving GPG public key',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
