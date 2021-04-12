import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { JwtRolesGuard } from '../jwt-roles.guard';

export function JwtAuth(allowedRoles?: string[]): any {
  return applyDecorators(
    UseGuards(JwtAuthGuard, JwtRolesGuard),
    Roles(allowedRoles),
    ApiBearerAuth(),
  );
}
