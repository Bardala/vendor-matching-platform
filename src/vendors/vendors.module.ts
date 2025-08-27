import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { ServicesModule } from 'src/services/services.module';
import { MatchesModule } from 'src/matches/matches.module';
import { VendorsService } from './vendors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    forwardRef(() => ServicesModule),
    forwardRef(() => MatchesModule),
  ],
  exports: [TypeOrmModule],
  providers: [VendorsService],
})
export class VendorsModule {}
