import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';
import { ServicesModule } from 'src/services/services.module';
import { MatchesModule } from 'src/matches/matches.module';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { AuthModule } from 'src/auth/auth.module';
import { VendorsScheduler } from './vendor.scheduler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vendor]),
    forwardRef(() => ServicesModule),
    forwardRef(() => MatchesModule),
    forwardRef(() => AuthModule),
  ],
  exports: [TypeOrmModule],
  providers: [VendorsService, VendorsScheduler],
  controllers: [VendorsController],
})
export class VendorsModule {}
