// database.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { mockAssetData } from '../data/panel';
import { Asset, MediaType } from '../utils/type';

export const NUM_OF_ASSETS = 20;

@Injectable()
export class DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper function to get random elements from an array
  private getRandomElements<T>(array: T[], numElements: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  }

  private async initializeDatabase(
    databaseName: string,
    countFunc: () => Promise<number>,
    createFunc: (assetId: number) => Promise<any>,
    mediaType: MediaType,
  ) {
    const count = await countFunc();
    const isEmpty = count === 0;

    if (isEmpty) {
      const selectedAssets = await this.getRandomDatabase(mediaType);
      for (const asset of selectedAssets) {
        await createFunc(asset.id);
      }

      console.log(`${databaseName} database initialized with random assets`);
    } else {
      console.log(`${databaseName} database initialization skipped`);
    }
  }

  private async getRandomDatabase(type: MediaType): Promise<Asset[]> {
    const assets = await this.prisma.asset.findMany({
      where: { media_type: type },
    });
    const numToCreate = Math.min(NUM_OF_ASSETS, assets.length); // Create up to 20 random assets, so can paginate
    return this.getRandomElements<Asset>(assets as Asset[], numToCreate);
  }

  async init() {
    // Check if we're in dev mode
    const isDev = process.env.NODE_ENV === 'development';

    // Initialize asset database
    const initializeAssetDatabase = async () => {
      const count = await this.prisma.asset.count();
      const isEmpty = count === 0;

      if (isDev && isEmpty) {
        // Create some test data
        for (const item of mockAssetData) {
          await this.prisma.asset.create({ data: item });
        }

        console.log('Asset database initialized with test data');
      } else {
        console.log('Asset database initialization skipped');
      }
    };

    // Initialize databases
    const initializeDatabase = async (
      databaseName: string,
      countFunc: () => Promise<number>,
      createFunc: (assetId: number) => Promise<any>,
      mediaType: MediaType,
    ) => {
      await this.initializeDatabase(
        databaseName,
        countFunc,
        createFunc,
        mediaType,
      );
    };

    await Promise.all([
      initializeAssetDatabase(),
      initializeDatabase(
        'TrendingTV',
        async () => await this.prisma.trendingTV.count(),
        async (assetId) =>
          await this.prisma.trendingTV.create({ data: { assetId } }),
        MediaType.TV,
      ),
      initializeDatabase(
        'TrendingMovie',
        async () => await this.prisma.trendingMovie.count(),
        async (assetId) =>
          await this.prisma.trendingMovie.create({ data: { assetId } }),
        MediaType.Movie,
      ),
      initializeDatabase(
        'PopularTV',
        async () => await this.prisma.popularTV.count(),
        async (assetId) =>
          await this.prisma.popularTV.create({ data: { assetId } }),
        MediaType.TV,
      ),
      initializeDatabase(
        'PopularMovie',
        async () => await this.prisma.popularMovie.count(),
        async (assetId) =>
          await this.prisma.popularMovie.create({ data: { assetId } }),
        MediaType.Movie,
      ),
    ]);
  }
}
