import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MigrationRunner } from '../database/db-migration';
import { ResearchSeeder } from './research/seeds/research.seeder';

async function bootstrap() {
  const { PORT } = process.env;
  if (!PORT) process.exit(1);
  const db = new MigrationRunner();
  await db.runMigration();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  const config = new DocumentBuilder()
    .setTitle('Vendor Matching Platform')
    .setDescription('API Test')
    .setVersion('1.0')
    // .addTag('auth') // Optional: tag your modules
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt', // name of the security scheme
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI at /api

  const seeder = app.get(ResearchSeeder);
  await seeder.seed();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
