import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import {
  AuthenticatedUserDTO,
  UserInfo,
} from './dto/authenticated-user.response.dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/mongoose/schemas/User.schema';

@Injectable()
export class AuthenticationsService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private getJwtToken(user: User | UserDocument): string {
    return this.jwtService.sign({
      _id: String(user._id).toString(),
      email: user.email,
      roles: user.roles,
    });
  }

  private getUserInfo(user: User | UserDocument): UserInfo {
    return {
      _id: String(user._id).toString(),
      email: user.email,
      roles: user.roles,
    };
  }

  async register(
    { email, password }: RegisterDTO,
    roles: string[],
  ): Promise<AuthenticatedUserDTO> {
    const emailAlreadyUsed = await this.usersService.exists({
      email,
    });

    if (emailAlreadyUsed) {
      throw new HttpException(
        `O email ${email} já está sendo utilizado por outro usuário.`,
        HttpStatus.CONFLICT,
      );
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = await this.usersService.store({
      email,
      password: encryptedPassword,
      roles,
    });

    return {
      user: this.getUserInfo(createdUser),
      token: this.getJwtToken(createdUser),
    };
  }

  async login({ email, password }: RegisterDTO): Promise<AuthenticatedUserDTO> {
    const user = await this.usersService.getOneByEmail(email, {
      includePassword: true,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return {
        user: this.getUserInfo(user),
        token: this.getJwtToken(user),
      };
    }

    throw new HttpException(
      `Credenciais incorrentas.`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}
