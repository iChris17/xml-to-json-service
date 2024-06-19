import { Resolver, Query } from '@nestjs/graphql';
import { DataService } from './data.service';
import { Make, VehicleType } from './interfaces';
import {
  Make as MakeDecorator,
  VehicleType as VehicleTypeDecorator,
} from './graphql.schema';

@Resolver()
export class DataResolver {
  constructor(private readonly dataService: DataService) {}

  @Query(() => [MakeDecorator])
  async makes(): Promise<Make[]> {
    const data = await this.dataService.getData();
    return data ? data.makes : [];
  }

  @Query(() => [VehicleTypeDecorator])
  async vehicleTypes(): Promise<VehicleType[]> {
    const data = await this.dataService.getData();
    return data ? data.vehicleTypes : [];
  }
}
