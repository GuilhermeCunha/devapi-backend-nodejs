import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Connector,
  connectorPrivacities,
  connectorStatus,
  connectorTypes,
} from 'src/mongoose/schemas/Connector.schema';
import { PaginatedResponse } from 'src/shared/pagination/dto/pagination-response.dto';

export class ListConnectors extends PaginatedResponse<Connector> {
  @ApiProperty({
    type: [Connector],
  })
  results: Connector[];
}
export class FilterConnectorsDTO {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    enum: connectorTypes,
  })
  @IsOptional()
  @IsIn(connectorTypes)
  type?: typeof connectorTypes[number];

  @ApiProperty({
    required: false,
    enum: connectorPrivacities,
  })
  @IsOptional()
  @IsIn(connectorPrivacities)
  privacy?: typeof connectorPrivacities[number];

  @ApiProperty({
    required: false,
    enum: connectorStatus,
  })
  @IsOptional()
  @IsIn(connectorStatus)
  status?: typeof connectorStatus[number];

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  baseUrl?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
