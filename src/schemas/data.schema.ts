import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Make, TransformedData, VehicleType } from '../interfaces';

@Schema()
export class Data extends Document implements TransformedData {
  @Prop({ type: Array, required: true })
  makes: Make[];

  @Prop({ type: Array, required: true })
  vehicleTypes: VehicleType[];
}

export const DataSchema = SchemaFactory.createForClass(Data);
