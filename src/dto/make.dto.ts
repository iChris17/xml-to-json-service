import { ObjectType, Field, Int } from '@nestjs/graphql';
import { VehicleTypeDto } from './vehicleType.dto';

@ObjectType()
export class MakeDto {
  @Field(() => Int)
  makeId: number;

  @Field()
  makeName: string;

  @Field(() => [VehicleTypeDto])
  vehicleTypes: VehicleTypeDto[];
}
