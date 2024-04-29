// Libs
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// Responses
import { HealthcheckResponse } from './healthcheckResponse.entity';

@ApiTags('Healthcheck')
@Controller()
export class HealthcheckController {
  @ApiOperation({ description: 'Returns an object with the current date' })
  @ApiOkResponse({ description: 'Success', type: HealthcheckResponse })
  @Get('/healthcheck')
  public healthcheck(): HealthcheckResponse {
    return { date: new Date().toISOString() };
  }
}
