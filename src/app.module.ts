import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TrendingModule } from './trending/trending.module';

// TODO: attribute TMDB

@Module({
  imports: [ConfigModule.forRoot(), TrendingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
