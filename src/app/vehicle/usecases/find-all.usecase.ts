import { Inject, Injectable } from '@nestjs/common';
import {
  FindAllVehiclesUseCaseResponse,
  IFindAllVehiclesUseCase,
} from './ports/find-all.usecase.interface';
import type { IVehicleRepository } from './ports/repositories/vehicle.repository';
import { VehicleRepository } from './ports/repositories/vehicle.repository';

@Injectable()
export class FindAllVehiclesUseCase implements IFindAllVehiclesUseCase {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(): Promise<FindAllVehiclesUseCaseResponse> {
    const [vehicles] = await this.vehicleRepository.findAll();
    return vehicles;
  }
}
