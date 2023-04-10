import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService, NUM_OF_ASSETS } from './database.service';
import { PrismaService } from '../prisma/prisma.service';
import { Asset, Availability, MediaType, TimeWindow } from '../utils/type';

jest.mock('@prisma/client', () => {
  const mockedPrisma = {
    asset: {
      findMany: jest.fn(),
      create: jest.fn(),
      count: jest.fn(),
    },
    trendingMovie: {
      findMany: jest.fn(),
      create: jest.fn(),
      count: jest.fn(),
    },
    trendingTV: {
      findMany: jest.fn(),
      create: jest.fn(),
      count: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  return { PrismaClient: jest.fn(() => mockedPrisma) };
});

describe('DatabaseService', () => {
  let databaseService: DatabaseService;
  let prismaService: PrismaService;
  const inputArray = [1, 2, 3, 4, 5];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, PrismaService],
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array with the specified number of elements', () => {
    const result = databaseService['getRandomElements'](inputArray, 3);
    expect(result.length).toBe(3);
  });

  it('should return an empty array when the input array is empty', () => {
    const result = databaseService['getRandomElements']([], 5);
    expect(result.length).toBe(0);
  });

  it('should return the entire array when the number of elements requested is greater than the length of the array', () => {
    const result = databaseService['getRandomElements'](inputArray, 10);
    expect(result.length).toBe(inputArray.length);
    expect(result).toEqual(expect.arrayContaining(inputArray));
  });

  it('should initialize the database with random assets if the database is empty', async () => {
    // Mock the getRandomDatabase function to return an array of 2 assets
    const mockAssets: unknown[] = [
      {
        id: 1,
        title: 'Mock Asset 1',
        tmdb_id: '123',
        media_type: MediaType.Movie,
        image: '/path/to/image1',
        available: Availability.OnTv,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'Mock Asset 2',
        tmdb_id: '456',
        media_type: MediaType.Movie,
        image: '/path/to/image2',
        available: Availability.OnTv,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    databaseService['getRandomDatabase'] = jest
      .fn()
      .mockResolvedValue(mockAssets);

    await databaseService['initializeDatabase'](
      'Test Database',
      async () => await Promise.resolve(0),
      async (assetId: number) =>
        await prismaService.trendingMovie.create({
          data: {
            assetId: assetId,
          },
        }),
      MediaType.Movie,
    );

    expect(prismaService.trendingMovie.create).toHaveBeenCalledTimes(2);
    expect(prismaService.trendingMovie.create).toHaveBeenCalledWith({
      data: {
        assetId: 1,
      },
    });
    expect(prismaService.trendingMovie.create).toHaveBeenCalledWith({
      data: {
        assetId: 2,
      },
    });
  });

  it('should not initialize the database if the database is not empty', async () => {
    await databaseService['initializeDatabase'](
      'Test Database',
      async () => await Promise.resolve(20),
      (assetId: number) =>
        prismaService.trendingMovie.create({
          data: {
            assetId: assetId,
          },
        }),
      MediaType.Movie,
    );

    expect(prismaService.trendingMovie.create).not.toHaveBeenCalled();
  });
});
