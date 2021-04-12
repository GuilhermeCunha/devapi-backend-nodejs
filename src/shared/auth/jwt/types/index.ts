import { ApiProperty } from '@nestjs/swagger';

export interface IJwtData {
  iat: number;
  exp: number;
}

export class TokenInfo {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: [String],
  })
  roles: string[];

  iat?: number;
  exp?: number;
}
