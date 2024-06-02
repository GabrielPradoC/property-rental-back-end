// Libs
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// DTOs
import { HealthcheckResponse } from './dtos/healthcheckResponse.dto';

// Decorators
import { ApiResponses, Public } from '../../common/decorators';

@ApiTags('Healthcheck')
@Controller()
export class HealthcheckController {
  @Public()
  @ApiOperation({ description: 'Returns an object with the current date' })
  @ApiResponses({
    [HttpStatus.OK]: { description: 'Success', type: HealthcheckResponse },
  })
  @Get('/healthcheck')
  public healthcheck(): HealthcheckResponse {
    return { date: new Date().toISOString() };
  }
}
