import { forwardRef, Module } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => UsersModule),
    forwardRef(() => ProjectsModule),
  ],
  exports: [TypeOrmModule, ClientsService],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
