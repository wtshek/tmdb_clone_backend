// prisma.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should connect to the database', async () => {
    const result = await prismaService.$queryRaw('SELECT 1+1 as result');
    expect(result[0].result).toEqual(2);
  });
});
