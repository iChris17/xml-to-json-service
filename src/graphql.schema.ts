import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Make {
  @Field()
  MakeId: string;

  @Field()
  MakeName: string;
}

@ObjectType()
export class VehicleType {
  @Field()
  MakeId: string;

  @Field()
  MakeName: string;

  @Field()
  VehicleTypeId: string;

  @Field()
  VehicleTypeName: string;
}
