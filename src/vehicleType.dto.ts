import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class VehicleTypeDto {
  @Field(() => Int)
  vehicleTypeId: number;

  @Field()
  vehicleTypeName: string;
}
