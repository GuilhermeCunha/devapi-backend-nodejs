import { Module } from '@nestjs/common';
import { AuthenticationsModule } from './api/authentications/authentications.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { AuthModule } from './shared/auth/auth.module';

@Module({
  imports: [MongooseModule, AuthModule, AuthenticationsModule],
})
export class AppModule {}
