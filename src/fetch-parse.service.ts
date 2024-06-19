import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { Make, VehicleType } from './interfaces';

@Injectable()
export class FetchParseService {
  async fetchAndParseXML<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    const parsedData = await parseStringPromise(response.data);
    return parsedData;
  }

  async fetchMakes(): Promise<Make[]> {
    const makesUrl =
      'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML';
    const makes = await this.fetchAndParseXML<{
      Response: { Results: Make[] };
    }>(makesUrl);
    return makes.Response.Results;
  }

  async fetchVehicleTypes(makeId: string): Promise<VehicleType[]> {
    const vehicleTypesUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/${makeId}?format=xml`;
    const vehicleTypes = await this.fetchAndParseXML<{
      Response: { Results: VehicleType[] };
    }>(vehicleTypesUrl);
    return vehicleTypes.Response.Results;
  }
}
