// Libs
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * findByEmail
   *
   * Searchs for an user with the informed email, if none is found throws an error
   *
   * @param email - Email to be searched
   * @returns Found user
   * @throws Error if no user is found with the informed email
   */
  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ email });
  }
}
