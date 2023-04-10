// panel.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { PanelService } from './panel.service';
import { PanelType } from '../utils/type';

@Controller('panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Get()
  async getPanelData(
    @Query('media_type') mediaType: string,
    @Query('panel') panel: PanelType,
    @Query('start') start: number,
    @Query('total') total: number,
  ) {
    const result = await this.panelService.getPanelData({
      mediaType,
      panel,
      start,
      total,
    });
    return result;
  }
}
