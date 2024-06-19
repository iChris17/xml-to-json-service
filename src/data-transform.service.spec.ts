import { DataTransformService } from './data-transform.service';
import { Make, VehicleType } from './interfaces';

describe('DataTransformService', () => {
  let service: DataTransformService;

  beforeEach(() => {
    service = new DataTransformService();
  });

  it('should combine makes and vehicle types correctly', () => {
    const makes: Make[] = [{ MakeId: '1', MakeName: 'Toyota' }];
    const vehicleTypes: VehicleType[] = [
      {
        MakeId: '1',
        MakeName: 'Toyota',
        VehicleTypeId: '1',
        VehicleTypeName: 'Sedan',
      },
    ];
    const result = service.transformData(makes, vehicleTypes);
    expect(result).toEqual({
      makes: [{ MakeId: '1', MakeName: 'Toyota' }],
      vehicleTypes: [
        {
          MakeId: '1',
          MakeName: 'Toyota',
          VehicleTypeId: '1',
          VehicleTypeName: 'Sedan',
        },
      ],
    });
  });
});
