import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const connectorTypes = ['REST', 'BD', 'SOAP'] as const;
export const connectorPrivacities = ['PUBLIC', 'PRIVATE'] as const;
export const connectorStatus = ['ACTIVE', 'INACTIVE'] as const;

@Schema()
export class Connector {
  @ApiProperty({
    type: String,
  })
  _id?: Types.ObjectId;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty({
    enum: connectorTypes,
  })
  @Prop({
    type: String,
  })
  type: typeof connectorTypes[number];

  @ApiProperty({
    enum: connectorPrivacities,
  })
  @Prop({
    type: String,
  })
  privacy: typeof connectorPrivacities[number];

  @ApiProperty({
    enum: connectorStatus,
  })
  @Prop({
    type: String,
  })
  status: typeof connectorStatus[number];

  @ApiProperty()
  @Prop()
  baseUrl: string;

  @ApiProperty()
  @Prop()
  logoUrl: string;

  @ApiProperty()
  @Prop()
  category: string;

  @ApiProperty()
  @Prop()
  description: string;

  @Prop({
    required: false,
    default: false,
  })
  isDeleted?: boolean;

  @ApiProperty()
  @Prop({
    required: false,
    default: () => Date.now(),
  })
  createdAt?: Date;
}

export type ConnectorDocument = Connector & Document;
export const ConnectorSchema = SchemaFactory.createForClass(Connector);
