import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MigrationRunner } from '../database/db-migration';

async function bootstrap() {
  const { PORT } = process.env;
  if (!PORT) process.exit(1);
  const db = new MigrationRunner();
  await db.runMigration();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API description and usage')
    .setVersion('1.0')
    .addTag('auth') // Optional: tag your modules
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
