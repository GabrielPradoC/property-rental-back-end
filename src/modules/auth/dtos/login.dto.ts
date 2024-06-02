// Libs
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @ApiProperty({ description: 'User email', example: 'test@email.com' })
  public email: string;

  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'J@,Fa9kOX5L2MsMOl*[#',
  })
  public password: string;
}
