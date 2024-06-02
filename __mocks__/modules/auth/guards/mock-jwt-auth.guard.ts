// Libs
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

// Services
import { mockUsersList } from '../../user/user.service';

// Decorators
import { IS_PUBLIC_KEY } from '../../../../src/common/decorators';

// Enums
import { EnumRoles } from '../../../../src/common/enums';

// Entities
import { User } from '../../../../src/modules/user/user.entity';

// Utils
import { ObjectUtils } from '../../../../src/utils/object-utils';

export class MockJwtAuthGuard {
  public canActivate(context: ExecutionContext): boolean {
    const reflector = new Reflector();
    const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization.split(' ')[1];

    switch (token) {
      case 'admin_token':
        request.user = ObjectUtils.omit<User, 'password'>(
          mockUsersList.find((user) => user.role === EnumRoles.ADMIN) as User,
          ['password'],
        );
        break;
      case 'user_token':
        request.user = ObjectUtils.omit<User, 'password'>(
          mockUsersList.find((user) => user.role === EnumRoles.USER) as User,
          ['password'],
        );
        break;
      default:
        return false;
    }

    return true;
  }
}
