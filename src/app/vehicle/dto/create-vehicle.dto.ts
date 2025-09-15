import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
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
