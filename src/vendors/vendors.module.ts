import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { ServicesModule } from 'src/services/services.module';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    forwardRef(() => ServicesModule),
    forwardRef(() => MatchesModule),
  ],
})
export class VendorsModule {}
