import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedsService {
  @Command({
    command: 'create:seeds',
    describe: 'create all seeds',
    autoExit: true,
  })
  async create() {
    console.log(`Criando seeds`);
    // TODO criar seeds
  }
}
