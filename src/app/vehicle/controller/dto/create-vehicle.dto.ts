import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  Matches,
  IsNumber,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Placa do veículo (formato brasileiro: ABC-1234)',
    example: 'ABC-1234',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}-\d{4}$/, {
    message: 'Placa deve estar no formato ABC-1234',
  })
  placa: string;

  @ApiProperty({
    description: 'Chassi do veículo',
    example: '9BWZZZ377VT123456',
  })
  @IsString()
  @IsNotEmpty()
  @Length(17, 17, { message: 'Chassi deve ter exatamente 17 caracteres' })
  chassi: string;

  @ApiProperty({
    description: 'Renavam do veículo',
    example: '12345678901',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'Renavam deve ter exatamente 11 dígitos' })
  renavam: string;

  @ApiProperty({
    description: 'Modelo do veículo',
    example: 'Fusca',
  })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({
    description: 'Marca do veículo',
    example: 'Volkswagen',
  })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({
    description: 'Ano do veículo',
    example: 1968,
  })
  @IsNumber()
  @IsInt()
  @Min(1886, {
    message: 'Ano mínimo permitido é 1886 (primeiro carro fabricado)',
  })
  @Max(new Date().getFullYear() + 1, {
    message: 'Ano não pode ser maior que o próximo ano',
  })
  ano: number;
}
