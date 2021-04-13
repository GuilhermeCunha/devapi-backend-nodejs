import { IsIn, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  connectorPrivacities,
  connectorStatus,
  connectorTypes,
} from 'src/mongoose/schemas/Connector.schema';

export class CreateConnectorDTO {
  @ApiProperty({
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    enum: connectorTypes,
  })
  @IsIn(connectorTypes)
  type: typeof connectorTypes[number];

  @ApiProperty({
    required: true,
    enum: connectorPrivacities,
  })
  @IsIn(connectorPrivacities)
  privacy: typeof connectorPrivacities[number];

  @ApiProperty({
    required: true,
    enum: connectorStatus,
  })
  @IsIn(connectorStatus)
  status: typeof connectorStatus[number];

  @ApiProperty({
    required: true,
  })
  @IsUrl()
  baseUrl: string;

  @ApiProperty({
    required: true,
  })
  @IsUrl()
  logoUrl: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  category: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  description: string;
}
