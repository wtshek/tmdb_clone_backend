// database.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { mockPanelData } from '../data/panel';

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async init() {
    // Check if we're in dev mode
    const isDev = process.env.NODE_ENV === 'development';

    // Check if the database is empty
    const count = await this.prisma.asset.count();
    const isEmpty = count === 0;

    // Initialize the database if we're in dev mode and the database is empty
    if (isDev && isEmpty) {
      // Create some test data

      for (const item of mockPanelData) {
        await this.prisma.asset.create({ data: item });
      }

      console.log('Database initialized with test data');
    } else {
      console.log('Database initialization skipped');
    }
  }
}
