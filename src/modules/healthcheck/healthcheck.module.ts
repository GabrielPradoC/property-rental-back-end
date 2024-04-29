// Libs
import { Module } from '@nestjs/common';

// Controllers
import { HealthcheckController } from './healthcheck.controller';

@Module({
  controllers: [HealthcheckController],
})
export class HealthcheckModule {}
