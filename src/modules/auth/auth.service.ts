// Libs
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

// Services
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from '../user/user.entity';

// Types
import { TJwtPayload } from 'src/common/types';

// Utils
import { ObjectUtils } from '../../utils/object-utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * validateUser
   *
   * Checks if the informed email and password corresponds to any user in the database
   *
   * @param email - Email
   * @param password - Password
   * @returns Found user or null if no user was found
   */
  public async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findByEmail(email);
    const passwordsMatch = await this.checkPassword(password, user.password);
    if (passwordsMatch) {
      return ObjectUtils.omit(user, ['password']);
    }

    return null;
  }

  /**
   * login
   *
   * Creates an access token for the informed user and returns it
   *
   * @param user - User to log in
   * @returns Access token
   */
  public login(user: Omit<User, 'password'>): { access_token: string } {
    const payload: TJwtPayload = {
      name: user.name,
      email: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * checkPassword
   *
   * Compares a password to a hash and return true if they match or false if they do not match
   *
   * @param password - Password to be compared
   * @param hash - Hash to compare the password against
   * @returns Result of the comparison
   */
  private async checkPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
