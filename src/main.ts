// Libs
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Modules
import { AppModule } from './app.module';

// Guards
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

// Pipes
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Property Rental API')
    .setDescription('The Property Rental API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Guards
  app.useGlobalGuards(app.get(JwtAuthGuard, { strict: false }));

  await app.listen(3000);
}
bootstrap();
