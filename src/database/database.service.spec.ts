import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockPanelData } from '../data/panel';

describe('DatabaseService', () => {
  let databaseService: DatabaseService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService, PrismaService],
    }).compile();

    databaseService = module.get<DatabaseService>(DatabaseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    // Delete all assets in the database after each test
    await prismaService.asset.deleteMany({});
  });

  it('should initialize the database with test data in development mode when the database is empty', async () => {
    // Set the NODE_ENV environment variable to 'development'
    process.env.NODE_ENV = 'development';

    // Call the init() method of the DatabaseService
    await databaseService.init();

    // Verify that the test data has been added to the database
    const assets = await prismaService.asset.findMany({});
    expect(assets.length).toBe(mockPanelData.length);
  });

  it('should not initialize the database when not in development mode', async () => {
    // Set the NODE_ENV environment variable to 'production'
    process.env.NODE_ENV = 'production';

    // Call the init() method of the DatabaseService
    await databaseService.init();

    // Verify that the database is empty
    const assets = await prismaService.asset.findMany({});
    expect(assets.length).toBe(0);
  });

  it('should not initialize the database when in development mode but the database already contains data', async () => {
    // Set the NODE_ENV environment variable to 'development'
    process.env.NODE_ENV = 'development';

    // Insert some data into the database before calling init()
    await prismaService.asset.create({
      data: {
        title: 'Test Asset',
        tmdb_id: '123',
        media_type: 'movie',
        image: '/path/to/image',
        time_window: 'today',
        available: 'on_tv',
      },
    });

    // Call the init() method of the DatabaseService
    await databaseService.init();

    // Verify that the database still contains only one asset
    const assets = await prismaService.asset.findMany({});
    expect(assets.length).toBe(1);
  });
});
