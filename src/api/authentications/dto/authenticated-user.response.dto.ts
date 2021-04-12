import { ApiProperty } from '@nestjs/swagger';

export class UserInfo {
  @ApiProperty({
    type: String,
  })
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: [String],
  })
  roles: string[];
}

export class AuthenticatedUserDTO {
  @ApiProperty({
    type: UserInfo,
  })
  user: UserInfo;

  @ApiProperty()
  token: string;
}
