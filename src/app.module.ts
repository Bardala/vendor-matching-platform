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
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        url: process.env.MYSQL_URL,
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
        charset: 'utf8mb4',
        timezone: 'Z',
      }),
    }),

    MongooseModule.forRoot(
      process.env.MONGODB_URI ??
        (() => {
          throw new Error('MONGODB_URI is not defined');
        })(),
    ),

    // Setup the scheduler for cron jobs
    ScheduleModule.forRoot(),

    AuthModule,
    UsersModule,
    ProjectsModule,
    VendorsModule,
    MatchesModule,
    ResearchModule,
    AnalyticsModule,
    TasksModule,
    NotificationsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
