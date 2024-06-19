import { Injectable } from '@nestjs/common';
import { Make, VehicleType, TransformedData } from './interfaces';

@Injectable()
export class DataTransformService {
  transformData(makes: Make[], vehicleTypes: VehicleType[]): TransformedData {
    const combinedData: TransformedData = {
      makes: makes,
      vehicleTypes: vehicleTypes,
    };
    return combinedData;
  }
}
