import { Module } from '@nestjs/common';
import { TrendingController } from './trending.controller';
import { TrendingService } from './trending.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TrendingController],
  providers: [TrendingService],
  imports: [HttpModule],
})
export class TrendingModule {}
