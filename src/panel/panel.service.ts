import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Asset, Availability, MediaType, PanelType } from '../utils/type';

@Injectable()
export class PanelService {
  constructor(private readonly prisma: PrismaService) {}

  private getLastDayAndWeek() {
    const oneDay = 24 * 60 * 60 * 1000;
    const lastDay = Date.now() - oneDay;
    const lastDayISO = new Date(lastDay).toISOString();

    const lastWeek = Date.now() - oneDay * 7;
    const lastWeekISO = new Date(lastWeek).toISOString();

    return {
      lastDay,
      lastDayISO,
      lastWeek,
      lastWeekISO,
    };
  }

  async getPanelData({
    panel,
    start = 0,
    total = 10,
    mediaType,
  }: {
    panel: PanelType;
    start?: number;
    total?: number;
    mediaType?: string;
  }): Promise<{
    data: Asset[];
    total: number;
    start: number;
    end: number;
    panel: PanelType;
  }> {
    let data;
    const { lastWeekISO, lastDayISO } = this.getLastDayAndWeek();

    const defaultQuery = {
      skip: start,
      take: total,
    };

    const includeAssetQuery = {
      ...defaultQuery,
      include: {
        asset: true,
      },
    };

    switch (panel) {
      case PanelType.Trending:
        if (!mediaType) {
          data = await this.prisma.trending.findMany(includeAssetQuery);
        } else if (mediaType === MediaType.Movie) {
          data = await this.prisma.trendingMovie.findMany(includeAssetQuery);
        } else if (mediaType === MediaType.TV) {
          data = await this.prisma.trendingTV.findMany(includeAssetQuery);
        }
        break;

      case PanelType.Popular:
        if (!mediaType) {
          data = await this.prisma.popular.findMany(includeAssetQuery);
        } else if (mediaType === MediaType.Movie) {
          data = await this.prisma.popularMovie.findMany(includeAssetQuery);
        } else if (mediaType === MediaType.TV) {
          data = await this.prisma.popularTV.findMany(includeAssetQuery);
        }
        break;

      case PanelType.ForRents:
        data = await this.prisma.asset.findMany({
          ...defaultQuery,
          where: { available: Availability.ForRents },
        });
        break;

      case PanelType.InTheaters:
        data = await this.prisma.asset.findMany({
          ...defaultQuery,
          where: { available: Availability.InTheaters },
        });
        break;

      case PanelType.OnTv:
        data = await this.prisma.asset.findMany({
          ...defaultQuery,
          where: { available: Availability.OnTv },
        });
        break;

      case PanelType.Streaming:
        data = await this.prisma.asset.findMany({
          ...defaultQuery,
          where: { available: Availability.Streaming },
        });
        break;

      case PanelType.Today:
        data = await this.prisma.asset.findMany({
          ...defaultQuery,
          where: { created_at: { gte: lastDayISO } },
        });
        break;

      case PanelType.ThisWeek:
        data = await this.prisma.asset.findMany({
          ...defaultQuery,
          where: { created_at: { gte: lastWeekISO } },
        });
        break;

      default:
        throw new Error('panel must be specified');
    }

    return {
      data,
      total: data?.length,
      start,
      end: start + data?.length - 1,
      panel,
    };
  }
}
