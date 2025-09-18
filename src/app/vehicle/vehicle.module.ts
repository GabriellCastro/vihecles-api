import { Module } from '@nestjs/common';

import { VehicleController } from './controller/vehicle.controller';
import { VehicleService } from './service/vehicle.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { VehicleRepository } from './usecases/ports/repositories/vehicle.repository';
import { DeleteVehicleUseCase } from './usecases/delete.usecase';
import { UpdateVehicleUseCase } from './usecases/update.usecase';
import { FindOneVehicleUseCase } from './usecases/find-one.usecase';
import { FindAllVehiclesUseCase } from './usecases/find-all.usecase';
import { CreateVehicleUseCase } from './usecases/create.usecase';

@Module({
  controllers: [VehicleController],
  providers: [
    VehicleService,
    PrismaService,
    VehicleRepository,
    CreateVehicleUseCase,
    FindAllVehiclesUseCase,
    FindOneVehicleUseCase,
    UpdateVehicleUseCase,
    DeleteVehicleUseCase,
  ],
})
export class VehicleModule {}
