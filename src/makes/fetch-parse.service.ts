import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { Make } from '../schemas/data.schema';
import { MakeDto } from '../dto/make.dto';

@Injectable()
export class VehiclesService {
  constructor(@InjectModel(Make.name) private makeModel: Model<Make>) {}

  async fetchAndTransformData(): Promise<MakeDto[]> {
    try {
      const makesResponse = await axios.get(
        'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML',
        {
          headers: {
            Accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          },
        },
      );

      const makesJson = await parseStringPromise(makesResponse.data);

      const results = makesJson.Response.Results[0];

      const makes = results?.AllVehicleMakes?.map(async (make) => {
        try {
          console.log('Processing make:', make);

          if (
            !make.Make_ID ||
            !make.Make_ID[0] ||
            !make.Make_Name ||
            !make.Make_Name[0]
          ) {
            throw new Error(
              `Invalid make data structure: ${JSON.stringify(make)}`,
            );
          }

          const vehicleTypesResponse = await axios.get(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${make.Make_ID[0]}?format=XML`,
            {
              headers: {
                Accept:
                  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
              },
            },
          );

          const vehicleTypesJson = await parseStringPromise(
            vehicleTypesResponse.data,
          );

          const vehicleTypesResults = vehicleTypesJson.Response.Results[0];

          const vehicleTypes = vehicleTypesResults?.VehicleTypesForMakeIds?.map(
            (type) => {
              return {
                vehicleTypeId: Number(type.VehicleTypeId[0]),
                vehicleTypeName: type.VehicleTypeName[0],
              };
            },
          );

          return {
            makeId: Number(make.Make_ID[0]),
            makeName: make.Make_Name[0],
            vehicleTypes,
          };
        } catch (vehicleTypesError) {
          console.error(
            `Error fetching vehicle types for make ${make.Make_ID[0]}:`,
            vehicleTypesError.message,
          );
          throw vehicleTypesError;
        }
      });

      const makesData = await Promise.all(makes);
      await this.makeModel.insertMany(makesData);
      return makesData;
    } catch (error) {
      console.error('Error fetching and transforming data:', error.message);
      throw error;
    }
  }
}
