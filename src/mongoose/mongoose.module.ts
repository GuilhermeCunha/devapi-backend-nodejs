import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose';
import { MONGOOSE_CONNECTION_STRING } from 'src/config/constants';
import { SeedsService } from './seeds/seeds.service';

@Module({
  imports: [
    NestMongooseModule.forRoot(MONGOOSE_CONNECTION_STRING, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class MongooseModule {}
