import { Controller, Get } from '@nestjs/common';
import { VehiclesService } from './makes/fetch-parse.service';

@Controller()
export class AppController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('fetch-transform-data')
  async fetchAndTransformData() {
    const data = await this.vehiclesService.fetchAndTransformData();
    return {
      message: 'Data fetched and transformed successfully',
      data,
    };
  }
}
