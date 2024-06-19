import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VehicleType extends Document {
  @Prop()
  vehicleTypeId: number;

  @Prop()
  vehicleTypeName: string;
}

@Schema()
export class Make extends Document {
  @Prop()
  makeId: number;

  @Prop()
  makeName: string;

  @Prop()
  vehicleTypes: VehicleType[];
}

export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType);
export const MakeSchema = SchemaFactory.createForClass(Make);
