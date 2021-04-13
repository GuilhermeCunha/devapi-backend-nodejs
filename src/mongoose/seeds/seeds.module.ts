import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { ConnectorsModule } from 'src/api/connectors/connectors.module';
import { SeedsService } from './seeds.service';

@Module({
  imports: [CommandModule, ConnectorsModule],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
