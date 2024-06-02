// Libs
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty({ description: 'Id of the user' })
  public id: string;

  @ApiProperty({ description: 'Name of the user' })
  public name: string;

  @ApiProperty({ description: 'Email of the user' })
  public email: string;
}
