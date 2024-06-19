import { Injectable, OnModuleInit } from '@nestjs/common';
import { VehiclesService } from './makes/fetch-parse.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly vehiclesService: VehiclesService) {}

  async onModuleInit() {
    try {
      console.log('Initializing module...');
      await this.vehiclesService.fetchAndTransformData();
      console.log('Data fetched and transformed successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
