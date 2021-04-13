import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Connector,
  ConnectorSchema,
} from 'src/mongoose/schemas/Connector.schema';
import { ConnectorsService } from './connectors.service';
import { ConnectorsController } from './connectors.controller';

const mongooseFeatures = MongooseModule.forFeature([
  { name: Connector.name, schema: ConnectorSchema },
]);
@Module({
  imports: [mongooseFeatures],
  providers: [ConnectorsService],
  exports: [ConnectorsService],
  controllers: [ConnectorsController],
})
export class ConnectorsModule {}
