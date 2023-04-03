import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { buildUrl } from '../utils/api';
import { MediaType, TimeWindow } from './type';

@Injectable()
export class TrendingService {
  constructor(private readonly httpService: HttpService) {}

  async getTrending(mediaType: MediaType, timeWindow: TimeWindow) {
    const url = buildUrl(`/trending/${mediaType}/${timeWindow}`);
    return this.httpService.get(url);
  }
}
