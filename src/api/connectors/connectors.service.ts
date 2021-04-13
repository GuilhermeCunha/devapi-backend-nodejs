import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Connector,
  ConnectorDocument,
} from 'src/mongoose/schemas/Connector.schema';
import { PaginatedResponse } from 'src/shared/pagination/dto/pagination-response.dto';
import { PaginationDTO } from 'src/shared/pagination/dto/pagination.dto';

export interface IGetManyConnectors {
  filters?: Partial<Connector>;
  pagination?: PaginationDTO;
}

export interface IGetOneConnector {
  filters?: Partial<Connector>;
}
export interface IUpdateOneConnector {
  filters?: Partial<Connector>;
  data: Partial<Connector>;
}

@Injectable()
export class ConnectorsService {
  constructor(
    @InjectModel(Connector.name)
    private connectorsModel: Model<ConnectorDocument>,
  ) {}
  async getMany({
    pagination,
    filters,
  }: IGetManyConnectors): Promise<PaginatedResponse<Connector> | Connector[]> {
    let query = this.connectorsModel.find(filters);
    console.log({ pagination });
    if (pagination) {
      const total = await this.connectorsModel.countDocuments(filters);
      query = query.skip(pagination.skip).limit(pagination.limit);

      return {
        pagination: {
          skip: pagination.skip,
          limit: pagination.limit,
          total,
        },
        results: await query,
      };
    }

    return await query;
  }

  async getOne({ filters }: IGetOneConnector): Promise<Connector> {
    const connector = await this.connectorsModel.findOne(filters);

    if (!connector)
      throw new HttpException('Conector não encontrado', HttpStatus.NOT_FOUND);

    return connector;
  }

  async create(data: Connector): Promise<Connector> {
    return this.connectorsModel.create(data);
  }

  async updateOne({ filters, data }: IUpdateOneConnector): Promise<void> {
    await this.connectorsModel.updateOne(
      {
        ...filters,
      },
      {
        $set: data,
      },
    );
  }

  async logicallyDeleteById(_id: string): Promise<void> {
    await this.connectorsModel.updateOne(
      {
        _id: _id,
      },
      {
        $set: {
          isDeleted: true,
        },
      },
    );
  }
  async deleteById(_id: string): Promise<void> {
    await this.connectorsModel.deleteOne({
      _id: _id,
    });
  }
}
