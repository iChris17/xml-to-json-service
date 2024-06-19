import { Injectable, OnModuleInit } from '@nestjs/common';
import { VehiclesService } from './fetch-parse.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly vehiclesService: VehiclesService) {}

  async onModuleInit() {
    console.log('Initializing module...');
    await this.vehiclesService.fetchAndTransformData();
    console.log('Data fetched and transformed successfully');
  }
}
