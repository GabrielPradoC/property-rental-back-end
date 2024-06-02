// Types
import { TJwtPayload } from '../../../../src/common/types';

export class JwtService {
  public sign(_payload: TJwtPayload): string {
    return 'jwt_token';
  }
}
