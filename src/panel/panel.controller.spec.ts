import { Test, TestingModule } from '@nestjs/testing';
import { PanelController } from './panel.controller';
import { PanelService } from './panel.service';
import { PanelType } from '../utils/type';
import { PrismaService } from '../prisma/prisma.service';

describe('PanelController', () => {
  let controller: PanelController;
  let service: PanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PanelController],
      providers: [PanelService, PrismaService],
    }).compile();

    controller = module.get<PanelController>(PanelController);
    service = module.get<PanelService>(PanelService);
  });

  it('should return the panel data', async () => {
    const mockPanelData = [
      { id: 1, name: 'Panel 1' },
      { id: 2, name: 'Panel 2' },
    ] as any;
    jest.spyOn(service, 'getPanelData').mockResolvedValue(mockPanelData);

    const mediaType = 'video';
    const panel = PanelType.Trending;
    const start = 0;
    const total = 10;

    const result = await controller.getPanelData(
      mediaType,
      panel,
      start,
      total,
    );

    expect(service.getPanelData).toHaveBeenCalledWith({
      mediaType,
      panel,
      start,
      total,
    });
    expect(result).toEqual(mockPanelData);
  });
});
