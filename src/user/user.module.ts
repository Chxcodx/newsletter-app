import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Organization } from 'src/organization/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Organization]),
    JwtModule.register({
      secret:
        '05432a25cdcb61473943a13a9ddc03226e6417a65c948d3f5538c8277419a904', // secret key for JWT
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
