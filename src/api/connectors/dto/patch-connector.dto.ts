import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  connectorPrivacities,
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

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string; // TODO Validar o que exatamente é o status
}
