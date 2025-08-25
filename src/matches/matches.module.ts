import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { VendorsModule } from 'src/vendors/vendors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => VendorsModule),
  ],
  exports: [TypeOrmModule],
})
export class MatchesModule {}
