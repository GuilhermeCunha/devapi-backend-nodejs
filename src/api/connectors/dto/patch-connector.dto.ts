import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  connectorPrivacities,
  connectorStatus,
  connectorTypes,
} from 'src/mongoose/schemas/Connector.schema';

export class PatchConnectorDTO {
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
  @IsUrl()
  baseUrl?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsUrl()
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
