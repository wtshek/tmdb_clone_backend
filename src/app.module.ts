import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PanelModule } from './panel/panel.module';
import { PrismaModule } from './prisma/prisma.module';
import { DatabaseModule } from './database/database.module';

// TODO: attribute TMDB

@Module({
  imports: [ConfigModule.forRoot(), PanelModule, PrismaModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
