import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ConnectorsService } from 'src/api/connectors/connectors.service';
import { Connector } from '../schemas/Connector.schema';

@Injectable()
export class SeedsService {
  constructor(private connectorsService: ConnectorsService) {}

  @Command({
    command: 'create:seeds',
    describe: 'create all seeds',
    autoExit: true,
  })
  async create() {
    console.log(`Criando seeds`);
    const connectors = (await this.connectorsService.getMany()) as Connector[];

    if (connectors.length < 1) {
      // TODO Implementar seeds
      // await this.connectorsService.createMany([{
      //   baseUrl: 'http://localhost:3333',
      //   category: 'categoria',
      //   description: 'Um descrição',
      //   logoUrl: 'um',
      //   name: 'Facebook',
      //   privacy: 'PRIVATE',
      //   status: ''
      // }]);
    }
  }
}
