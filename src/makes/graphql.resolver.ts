import { Resolver, Query } from '@nestjs/graphql';
import { VehiclesService } from './fetch-parse.service';
import { MakeDto } from '../dto/make.dto';

@Resolver(() => MakeDto)
export class VehiclesResolver {
  constructor(private vehiclesService: VehiclesService) {}

  @Query(() => [MakeDto])
  async makes() {
    return this.vehiclesService.fetchAndTransformData();
  }
}
