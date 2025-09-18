import { Inject, Injectable } from '@nestjs/common';
import type { ICreateVehicleUseCase } from '../usecases/ports/create.usecase.interface';
import type { IFindAllVehiclesUseCase } from '../usecases/ports/find-all.usecase.interface';
import type { IFindOneVehicleUseCase } from '../usecases/ports/find-one.usecase.interface';
import type { IUpdateVehicleUseCase } from '../usecases/ports/update.usecase.interface';
import type { IDeleteVehicleUseCase } from '../usecases/ports/delete.usecase.interface';
import { CreateVehicleUseCaseParams } from '../usecases/ports/create.usecase.interface';
import { FindOneVehicleUseCaseParams } from '../usecases/ports/find-one.usecase.interface';
import { UpdateVehicleUseCaseParams } from '../usecases/ports/update.usecase.interface';
import { DeleteVehicleUseCaseParams } from '../usecases/ports/delete.usecase.interface';
import { FindOneVehicleUseCase } from '../usecases/find-one.usecase';
import { UpdateVehicleUseCase } from '../usecases/update.usecase';
import { DeleteVehicleUseCase } from '../usecases/delete.usecase';
import { CreateVehicleUseCase } from '../usecases/create.usecase';
import { FindAllVehiclesUseCase } from '../usecases/find-all.usecase';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(CreateVehicleUseCase)
    private readonly createVehicleUseCase: ICreateVehicleUseCase,

    @Inject(FindAllVehiclesUseCase)
    private readonly findAllVehiclesUseCase: IFindAllVehiclesUseCase,

    @Inject(FindOneVehicleUseCase)
    private readonly findOneVehicleUseCase: IFindOneVehicleUseCase,

    @Inject(UpdateVehicleUseCase)
    private readonly updateVehicleUseCase: IUpdateVehicleUseCase,

    @Inject(DeleteVehicleUseCase)
    private readonly deleteVehicleUseCase: IDeleteVehicleUseCase,
  ) {}

  public async create(params: CreateVehicleUseCaseParams) {
    return await this.createVehicleUseCase.execute(params);
  }

  public async findAll() {
    return await this.findAllVehiclesUseCase.execute();
  }

  public async findOne(params: FindOneVehicleUseCaseParams) {
    return await this.findOneVehicleUseCase.execute(params);
  }

  public async update(params: UpdateVehicleUseCaseParams) {
    return await this.updateVehicleUseCase.execute(params);
  }

  public async remove(params: DeleteVehicleUseCaseParams) {
    return await this.deleteVehicleUseCase.execute(params);
  }
}
