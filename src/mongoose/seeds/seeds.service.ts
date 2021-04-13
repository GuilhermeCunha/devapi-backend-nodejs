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
      await this.connectorsService.createMany(
        [
          'facebook',
          'google',
          'instagram',
          'orkut',
          'ibm',
          'amazon',
          'mercado-livre',
        ].map((companyName, index) => {
          return {
            baseUrl: `http://google.com/${companyName}`,
            category: `categoria ${index + 1}`,
            description: `Api da ${companyName}`,
            logoUrl: `http://google.com/${companyName}/icon.png`,
            name: companyName,
            privacy: 'PRIVATE',
            status: index < 2 ? 'ACTIVE' : 'INACTIVE',
            type: index < 2 ? 'REST' : 'SOAP',
          };
        }),
      );
    }
  }
}
