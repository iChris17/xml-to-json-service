import { Injectable, OnModuleInit } from '@nestjs/common';
import { FetchParseService } from './fetch-parse.service';
import { DataTransformService } from './data-transform.service';
import { DataService } from './data.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly fetchParseService: FetchParseService,
    private readonly dataTransformService: DataTransformService,
    private readonly dataService: DataService,
  ) {}

  async onModuleInit() {
    const makes = await this.fetchParseService.fetchMakes();
    const vehicleTypes = await Promise.all(
      makes.map((make) =>
        this.fetchParseService.fetchVehicleTypes(make.MakeId),
      ),
    );
    const transformedData = this.dataTransformService.transformData(
      makes,
      vehicleTypes.flat(),
    );
    await this.dataService.saveData(transformedData);
  }
}
