import { Test, TestingModule } from '@nestjs/testing';
import { PanelService } from './panel.service';
import { PrismaService } from '../prisma/prisma.service';
import { Availability, MediaType, PanelType } from '../utils/type';

describe('PanelService', () => {
  let service: PanelService;
  let prisma: PrismaService;
  const ONE_DAY = 24 * 60 * 60 * 1000;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2023-04-10'));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PanelService, PrismaService],
    }).compile();

    service = module.get<PanelService>(PanelService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should request with asset true to get the full data object', async () => {
    prisma.trending.findMany = jest.fn();

    await service.getPanelData({ panel: PanelType.Trending });

    expect(prisma.trending.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.trending.findMany).toHaveBeenLastCalledWith(
      expect.objectContaining({ include: { asset: true } }),
    );
  });

  it('should request with the correct available value', async () => {
    prisma.asset.findMany = jest.fn();

    await service.getPanelData({ panel: PanelType.InTheaters });

    expect(prisma.asset.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.asset.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { available: Availability.InTheaters },
      }),
    );
  });

  it('should call with correct created_at time comparison for todays show', async () => {
    prisma.asset.findMany = jest.fn();

    await service.getPanelData({ panel: PanelType.Today });

    expect(prisma.asset.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.asset.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          created_at: {
            gte: new Date(Date.now() - ONE_DAY).toISOString(),
          },
        },
      }),
    );
  });

  it('should call with correct created_at time comparison for this week show', async () => {
    prisma.asset.findMany = jest.fn();

    await service.getPanelData({ panel: PanelType.ThisWeek });

    expect(prisma.asset.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.asset.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          created_at: {
            gte: new Date(Date.now() - ONE_DAY * 7).toISOString(),
          },
        },
      }),
    );
  });
});
