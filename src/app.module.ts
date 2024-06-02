// Libs
import { Module } from '@nestjs/common';

// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      autoLoadEntities: true,
      migrations: ['dist/migrations/**.js'],
      migrationsRun: true,
    }),
    HealthcheckModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
