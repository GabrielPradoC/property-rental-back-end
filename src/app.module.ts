// Libs
import { Module } from '@nestjs/common';

// Modules
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';

@Module({
  imports: [HealthcheckModule],
})
export class AppModule {}
