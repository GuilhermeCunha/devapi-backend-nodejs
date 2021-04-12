import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class User {
  @ApiProperty()
  _id?: Types.ObjectId;

  @ApiProperty()
  @Prop({
    required: true,
  })
  email: string;

  @ApiProperty({
    nullable: true,
  })
  @Prop({
    select: false,
  })
  password?: string;

  @ApiProperty()
  @Prop({
    type: [String],
    default: [],
  })
  roles: string[];

  @ApiProperty()
  @Prop({
    required: false,
    default: () => Date.now(),
  })
  createdAt?: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
