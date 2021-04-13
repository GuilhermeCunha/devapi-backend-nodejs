import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ROLES } from 'src/config/constants';
import { User } from 'src/mongoose/schemas/User.schema';
import { JwtAuth } from 'src/shared/auth/jwt/decorators/jwt-auth.decorator';
import { JwtUser } from 'src/shared/auth/jwt/decorators/jwt-user.decorator';
import { TokenInfo } from 'src/shared/auth/jwt/types';
import { AuthenticationsService } from './authentications.service';
import { AuthenticatedUserDTO } from './dto/authenticated-user.response.dto';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@ApiTags('authentications')
@Controller('authentications')
export class AuthenticationsController {
  constructor(private readonly authenticationService: AuthenticationsService) {}

  @ApiCreatedResponse({
    description: 'Usuário cadastrado com sucesso.',
    type: AuthenticatedUserDTO,
  })
  @Post('/users')
  async register(@Body() dto: RegisterDTO): Promise<AuthenticatedUserDTO> {
    return await this.authenticationService.register(dto, [ROLES.USER]);
  }

  @ApiCreatedResponse({
    description: 'Administrador cadastrado com sucesso.',
    type: AuthenticatedUserDTO,
  })
  @Post('/admins')
  async registerAdmin(@Body() dto: RegisterDTO): Promise<AuthenticatedUserDTO> {
    return await this.authenticationService.register(dto, [
      ROLES.USER,
      ROLES.ADMIN,
    ]);
  }

  @ApiOkResponse({
    description: 'Login realizado com sucesso.',
    type: AuthenticatedUserDTO,
  })
  @Post('/login')
  async login(@Body() dto: LoginDTO): Promise<AuthenticatedUserDTO> {
    return await this.authenticationService.login(dto);
  }

  @ApiCreatedResponse({
    description: 'Usuário obtido com sucesso.',
    type: User,
  })
  @JwtAuth([])
  @Get('/me')
  async me(@JwtUser() user: TokenInfo): Promise<TokenInfo> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...tokenInfo } = user;
    return tokenInfo;
  }
}
