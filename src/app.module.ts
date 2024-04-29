// Libs
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [],
      synchronize: false,
    }),
    HealthcheckModule,
  ],
})
export class AppModule {}
