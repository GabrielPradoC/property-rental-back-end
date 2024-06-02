// Libs
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Types
import { TJwtPayload } from 'src/common/types';

// DTOs
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * validate
   *
   * Maps the JWT payload to a DTO
   *
   * @param payload - JWT payload
   * @returns DTO
   */
  public async validate(payload: TJwtPayload): Promise<UserDTO> {
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}
