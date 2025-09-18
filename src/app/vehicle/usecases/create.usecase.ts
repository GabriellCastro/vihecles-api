import { Inject, Injectable } from '@nestjs/common';
import {
  CreateVehicleUseCaseParams,
  CreateVehicleUseCaseResponse,
  ICreateVehicleUseCase,
} from './ports/create.usecase.interface';
import type { IVehicleRepository } from './ports/repositories/vehicle.repository';
import { VehicleRepository } from './ports/repositories/vehicle.repository';

@Injectable()
export class CreateVehicleUseCase implements ICreateVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    params: CreateVehicleUseCaseParams,
  ): Promise<CreateVehicleUseCaseResponse> {
    await this.vehicleRepository.create(params.body);
    return { message: 'VehicleCreatedSuccessfully' };
  }
}
