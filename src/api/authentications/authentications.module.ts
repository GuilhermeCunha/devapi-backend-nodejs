import { Module } from '@nestjs/common';
import { AuthModule } from 'src/shared/auth/auth.module';
import { UsersModule } from '../users/users.module';
import { AuthenticationsController } from './authentications.controller';
import { AuthenticationsService } from './authentications.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService],
})
export class AuthenticationsModule {}
