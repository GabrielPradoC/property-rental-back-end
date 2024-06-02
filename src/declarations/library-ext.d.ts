// DTOs
import { UserDTO } from '../modules/auth/dtos/user.dto';

declare module 'express' {
  export interface Request {
    user?: UserDTO;
  }
}
