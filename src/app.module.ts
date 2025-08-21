import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { VendorsModule } from './vendors/vendors.module';
import { MatchesModule } from './matches/matches.module';
import { ResearchModule } from './research/research.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { TasksModule } from './tasks/tasks.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    // Loads .env file
    ConfigModule.forRoot({ isGlobal: true }),
    // Initialize MySQL/TypeORM connection (we will configure it fully later)
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        url: process.env.MYSQL_URL,
        autoLoadEntities: true, // Auto load entities from modules
        synchronize: process.env.NODE_ENV !== 'production', // NOTE: Don't use in prod, use migrations!
      }),
    }),
    // Initialize MongoDB/Mongoose connection
    MongooseModule.forRoot(
      process.env.MONGODB_URI ??
        (() => {
          throw new Error('MONGODB_URI is not defined');
        })(),
    ),
    // Setup the scheduler for cron jobs
    ScheduleModule.forRoot(),
    // Our feature modules
    AuthModule,
    UsersModule,
    ProjectsModule,
    VendorsModule,
    MatchesModule,
    ResearchModule,
    AnalyticsModule,
    TasksModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
