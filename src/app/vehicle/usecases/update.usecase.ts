import { Inject, Injectable } from '@nestjs/common';
import type { IVehicleRepository } from './ports/repositories/vehicle.repository';
import { VehicleRepository } from './ports/repositories/vehicle.repository';
import {
  IUpdateVehicleUseCase,
  UpdateVehicleUseCaseParams,
  UpdateVehicleUseCaseResponse,
} from './ports/update.usecase.interface';

@Injectable()
export class UpdateVehicleUseCase implements IUpdateVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    params: UpdateVehicleUseCaseParams,
  ): Promise<UpdateVehicleUseCaseResponse> {
    const vehicle = await this.vehicleRepository.findOne({ id: params.id });
    if (!vehicle) {
      throw new Error('VehicleNotFound');
    }

    const updated = await this.vehicleRepository.update(
      { id: params.id },
      params.body,
    );

    if (!updated) {
      throw new Error('VehicleNotUpdated');
    }

    return { message: 'VehicleUpdatedSuccessfully' };
  }
}
