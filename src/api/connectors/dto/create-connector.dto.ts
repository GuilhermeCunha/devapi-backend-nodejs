import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  connectorPrivacities,
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
  })
  @IsString()
  baseUrl: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
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

  @ApiProperty({
    required: true,
  })
  @IsString()
  status: string; // TODO Validar o que exatamente é o status
}
