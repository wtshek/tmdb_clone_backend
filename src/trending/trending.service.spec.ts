import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { TrendingService } from './trending.service';
import { buildUrl } from '../utils/api';
import { MediaType, TimeWindow } from './type';
import { mockTrendingData } from '../data/trending';

describe('TrendingService', () => {
  let service: TrendingService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrendingService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TrendingService>(TrendingService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return trending data', async () => {
    jest.spyOn(httpService, 'get').mockResolvedValue(mockTrendingData as never);

    const mediaType = MediaType.Movie;
    const timeWindow = TimeWindow.Day;
    const url = buildUrl(`/trending/${mediaType}/${timeWindow}`);
    const result = await service.getTrending(mediaType, timeWindow);

    expect(httpService.get).toBeCalledWith(url);
    expect(result).toEqual(mockTrendingData);
  });
});
