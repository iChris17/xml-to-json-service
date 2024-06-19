import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { VehiclesService } from './fetch-parse.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Make } from '../schemas/data.schema';
import { parseStringPromise } from 'xml2js';

describe('fetch-parse.service', () => {
  let service: VehiclesService;
  let makeModel: Model<Make>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getModelToken(Make.name),
          useValue: {
            insertMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    makeModel = module.get<Model<Make>>(getModelToken(Make.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and transform data correctly', async () => {
    const mockMakesXml = `
      <Response>
        <Results>
          <AllVehicleMakes>
            <Make_ID>1</Make_ID>
            <Make_Name>Make 1</Make_Name>
          </AllVehicleMakes>
        </Results>
      </Response>
    `;
    const mockVehicleTypesXml = `
      <Response>
        <Results>
          <VehicleTypesForMakeIds>
            <VehicleTypeId>1</VehicleTypeId>
            <VehicleTypeName>Type 1</VehicleTypeName>
          </VehicleTypesForMakeIds>
          <VehicleTypesForMakeIds>
            <VehicleTypeId>2</VehicleTypeId>
            <VehicleTypeName>Type 2</VehicleTypeName>
          </VehicleTypesForMakeIds>
        </Results>
      </Response>
    `;
    jest
      .spyOn(axios, 'get')
      .mockResolvedValueOnce({ data: mockMakesXml } as any)
      .mockResolvedValueOnce({ data: mockVehicleTypesXml } as any);

    jest
      .spyOn<any, any>(parseStringPromise, 'bind')
      .mockImplementation((data) => {
        return jest.fn().mockResolvedValueOnce(data);
      });

    const mockMakeDto = [
      {
        makeId: 1,
        makeName: 'Make 1',
        vehicleTypes: [
          { vehicleTypeId: 1, vehicleTypeName: 'Type 1' },
          { vehicleTypeId: 2, vehicleTypeName: 'Type 2' },
        ],
      },
    ];
    jest
      .spyOn(makeModel, 'insertMany')
      .mockResolvedValueOnce(mockMakeDto as any);

    const result = await service.fetchAndTransformData();
    expect(result).toEqual(mockMakeDto);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=XML',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        },
      },
    );
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/1?format=XML',
      {
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        },
      },
    );

    expect(makeModel.insertMany).toHaveBeenCalledTimes(1);
    expect(makeModel.insertMany).toHaveBeenCalledWith(mockMakeDto);
  });
});
