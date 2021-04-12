import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenInfo } from './types';

@Injectable()
export class JwtRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  matchRoles(roles: string[], user: TokenInfo): boolean {
    return user.roles.some((userRole) => roles.includes(userRole));
  }

  canActivate(context: ExecutionContext): boolean {
    const acceptedRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!acceptedRoles || acceptedRoles.length < 1) return true;

    const request = context.switchToHttp().getRequest();

    const user: TokenInfo = request.user;

    if (!user || !user.roles || user.roles.length < 1) return false;

    return this.matchRoles(acceptedRoles, user);
  }
}
