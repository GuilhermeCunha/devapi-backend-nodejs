import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JWT_SALT } from 'src/config/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_SALT,
        signOptions: {
          expiresIn: '86400s',
        },
      }),
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, NestJwtModule],
})
export class JwtModule {}
