import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { SeedsService } from './seeds.service';

@Module({
  imports: [CommandModule],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
