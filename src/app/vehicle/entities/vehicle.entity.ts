import { ApiProperty } from '@nestjs/swagger';
import { IVehicleDomain } from '../domain/vehicle.domain';

export class VehicleEntity implements IVehicleDomain {
  @ApiProperty()
  id: string;

  @ApiProperty()
  placa: string;

  @ApiProperty()
  chassi: string;

  @ApiProperty()
  renavam: string;

  @ApiProperty()
  modelo: string;

  @ApiProperty()
  marca: string;

  @ApiProperty()
  ano: number;
}
