import { Controller, Get, Param } from '@nestjs/common';
import { FetchParseService } from './fetch-parse.service';
import { DataTransformService } from './data-transform.service';
import { DataService } from './data.service';
import { Make, VehicleType } from './interfaces';

@Controller('data')
export class AppController {
  constructor(
    private readonly fetchParseService: FetchParseService,
    private readonly dataTransformService: DataTransformService,
    private readonly dataService: DataService,
  ) {}

  @Get('fetch')
  async fetchData(): Promise<string> {
    // Fetch the makes
    const makes = await this.fetchParseService.fetchMakes();

    // Fetch vehicle types for each make
    const vehicleTypes = await Promise.all(
      makes.map((make) =>
        this.fetchParseService.fetchVehicleTypes(make.MakeId),
      ),
    );

    // Transform the data
    const transformedData = this.dataTransformService.transformData(
      makes,
      vehicleTypes.flat(),
    );

    // Save the data to the database
    await this.dataService.saveData(transformedData);

    return 'Data fetched and saved successfully!';
  }

  @Get('makes')
  async getMakes(): Promise<Make[]> {
    const data = await this.dataService.getData();
    return data ? data.makes : [];
  }

  @Get('vehicle-types')
  async getVehicleTypes(): Promise<VehicleType[]> {
    const data = await this.dataService.getData();
    return data ? data.vehicleTypes : [];
  }

  @Get('vehicle-types/:makeId')
  async getVehicleTypesByMake(
    @Param('makeId') makeId: string,
  ): Promise<VehicleType[]> {
    const data = await this.dataService.getData();
    return data ? data.vehicleTypes.filter((vt) => vt.MakeId === makeId) : [];
  }
}
