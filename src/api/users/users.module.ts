import { Module } from '@nestjs/common';
import { User, UserSchema } from 'src/mongoose/schemas/User.schema';
import { UsersService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';

const mongooseFeatures = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
@Module({
  imports: [mongooseFeatures],
  providers: [UsersService],
  exports: [mongooseFeatures, UsersService],
})
export class UsersModule {}
