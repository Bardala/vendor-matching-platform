import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { ServicesModule } from 'src/services/services.module';
import { MatchesModule } from 'src/matches/matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ResearchModule } from 'src/research/research.module';

@Module({
  providers: [ProjectsService],
  controllers: [ProjectsController],
  imports: [
    TypeOrmModule.forFeature([Project]),
    forwardRef(() => ClientsModule),
    forwardRef(() => MatchesModule),
    forwardRef(() => ClientsModule),
    ResearchModule,
    ServicesModule,
  ],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
