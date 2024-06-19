export interface Make {
  MakeId: string;
  MakeName: string;
  vehicleTypes: VehicleType[];
}

export interface VehicleType {
  VehicleTypeId: string;
  VehicleTypeName: string;
}
