import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service';

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const databaseService = app.get(DatabaseService);
  await databaseService.init(); // Initialize the database

  await app.listen(PORT);
}
bootstrap();
