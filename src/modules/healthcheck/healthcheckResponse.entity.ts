// Libs
import { ApiProperty } from '@nestjs/swagger';

export class HealthcheckResponse {
  @ApiProperty({
    description: 'The current date',
    example: '2024-04-28T21:20:03.626Z',
  })
  date: string;
}
