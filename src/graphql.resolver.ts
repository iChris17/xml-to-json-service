import { Resolver, Query } from '@nestjs/graphql';
import { DataService } from './data.service';
import { Make, VehicleType } from './interfaces';

@Resolver()
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Query(() => [])
  async makes(): Promise<Make[]> {
    const data = await this.dataService.getData();
    return data ? data.makes : [];
  }

  @Query(() => [])
  async vehicleTypes(): Promise<VehicleType[]> {
    const data = await this.dataService.getData();
    return data ? data.vehicleTypes : [];
  }
}
