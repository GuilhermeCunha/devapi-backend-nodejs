import { Body, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/config/constants';
import { Connector } from 'src/mongoose/schemas/Connector.schema';
import { toMongooseId } from 'src/mongoose/utils';
import { JwtAuth } from 'src/shared/auth/jwt/decorators/jwt-auth.decorator';
import { PaginatedResponse } from 'src/shared/pagination/dto/pagination-response.dto';
import { PaginationDTO } from 'src/shared/pagination/dto/pagination.dto';
import { ConnectorsService } from './connectors.service';
import { CreateConnectorDTO } from './dto/create-connector.dto';
import { FilterConnectorsDTO, ListConnectors } from './dto/list-connectors.dto';
import { PatchConnectorDTO } from './dto/patch-connector.dto';
import { UpdateConnectorDTO } from './dto/update-connector.dto';

@ApiTags('connectors')
@Controller('connectors')
export class ConnectorsController {
  constructor(private connectorsService: ConnectorsService) {}

  @ApiOkResponse({
    description: 'Conectores obtidos com sucesso',
    type: ListConnectors,
  })
  @JwtAuth([])
  @Get('/')
  async getMany(
    @Query() filters: FilterConnectorsDTO = {},
    @Query()
    pagination: PaginationDTO,
  ): Promise<PaginatedResponse<Connector>> {
    const connectors = await this.connectorsService.getMany({
      filters: {
        ...filters,
        isDeleted: false,
      },
      pagination,
    });

    return connectors as PaginatedResponse<Connector>;
  }

  @ApiOkResponse({
    description: 'Conector obtido com sucesso.',
    type: Connector,
  })
  @JwtAuth([])
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Connector> {
    return await this.connectorsService.getOne({
      filters: {
        _id: toMongooseId(id),
        isDeleted: false,
      },
    });
  }

  @ApiCreatedResponse({
    description: 'Conector cadastrada com sucesso.',
    type: Connector,
  })
  @Post('/')
  @JwtAuth([ROLES.ADMIN])
  async store(@Body() dto: CreateConnectorDTO): Promise<Connector> {
    return await this.connectorsService.create(dto);
  }

  @ApiOkResponse({
    description: 'Conector atualizado com sucesso.',
  })
  @Put(':id')
  @JwtAuth([ROLES.ADMIN])
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateConnectorDTO,
  ): Promise<void> {
    return await this.connectorsService.updateOne({
      filters: {
        _id: toMongooseId(id),
      },
      data: dto,
    });
  }

  @ApiOkResponse({
    description: 'Conector atualizado com sucesso.',
  })
  @Patch(':id')
  @JwtAuth([ROLES.ADMIN])
  async partialUpdate(
    @Param('id') id: string,
    @Body() dto: PatchConnectorDTO,
  ): Promise<void> {
    return await this.connectorsService.updateOne({
      filters: {
        _id: toMongooseId(id),
      },
      data: dto,
    });
  }
}
