import type { IVehicleRepository } from './ports/repositories/vehicle.repository';
import { VehicleRepository } from './ports/repositories/vehicle.repository';
import { Inject, Injectable } from '@nestjs/common';
import {
  DeleteVehicleUseCaseParams,
  DeleteVehicleUseCaseResponse,
  IDeleteVehicleUseCase,
} from './ports/delete.usecase.interface';

@Injectable()
export class DeleteVehicleUseCase implements IDeleteVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    params: DeleteVehicleUseCaseParams,
  ): Promise<DeleteVehicleUseCaseResponse> {
    const vehicle = await this.vehicleRepository.findOne({ id: params.id });

    if (!vehicle) {
      throw new Error('VehicleNotFound');
    }

    await this.vehicleRepository.remove(params.id);

    return { message: 'VehicleDeletedSuccessfully' };
  }
}
