// Libs
import { Module } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

// Modules
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';

// Controllers
import { AuthController } from './auth.controller';

// Guards
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
