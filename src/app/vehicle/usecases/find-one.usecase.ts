import { Inject, Injectable } from '@nestjs/common';
import {
  FindOneVehicleUseCaseParams,
  FindOneVehicleUseCaseResponse,
  IFindOneVehicleUseCase,
} from './ports/find-one.usecase.interface';
import type { IVehicleRepository } from './ports/repositories/vehicle.repository';
import { VehicleRepository } from './ports/repositories/vehicle.repository';

@Injectable()
export class FindOneVehicleUseCase implements IFindOneVehicleUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(
    params: FindOneVehicleUseCaseParams,
  ): Promise<FindOneVehicleUseCaseResponse> {
    const vehicle = await this.vehicleRepository.findOne({ id: params.id });

    if (!vehicle) {
      throw new Error('VehicleNotFound');
    }

    return vehicle;
  }
}
