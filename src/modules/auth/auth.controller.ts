// Libs
import {
  Controller,
  Request,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

// DTOs
import { LoginDTO } from './dtos/login.dto';
import { UserDTO } from './dtos/user.dto';

// Services
import { AuthService } from './auth.service';

// Decorators
import { ApiResponses, Public } from '../../common/decorators';

// Utils
import { ObjectUtils } from '../../utils/object-utils';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiResponses({
    [HttpStatus.OK]: { description: 'Login successful' },
    [HttpStatus.UNAUTHORIZED]: { description: 'Invalid email or password' },
  })
  @ApiBody({ type: LoginDTO, description: 'Email and password for login' })
  @Post('/login')
  @HttpCode(200)
  public async login(
    @Body() body: LoginDTO,
  ): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'Returns the current logged user',
  })
  @ApiResponses({
    [HttpStatus.OK]: { type: UserDTO, description: 'Current logged in user' },
    [HttpStatus.UNAUTHORIZED]: {
      description: 'You need to be logged in to use this route',
    },
  })
  @Get('/me')
  public getCurrentUser(@Request() req: ExpressRequest): UserDTO {
    return ObjectUtils.filter(req.user, ['id', 'name', 'email']);
  }
}
