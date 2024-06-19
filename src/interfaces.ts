export interface Make {
  MakeId: string;
  MakeName: string;
}

export interface VehicleType {
  MakeId: string;
  MakeName: string;
  VehicleTypeId: string;
  VehicleTypeName: string;
}

export interface TransformedData {
  makes: Make[];
  vehicleTypes: VehicleType[];
}
