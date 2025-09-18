import { UseCase } from 'src/share/contracts/usecase';
import { CreateVehicleDto } from '../../controller/dto/create-vehicle.dto';

export type CreateVehicleUseCaseParams = {
  body: CreateVehicleDto;
};

export type CreateVehicleUseCaseResponse = {
  message: string;
};

export type ICreateVehicleUseCase = UseCase<
  CreateVehicleUseCaseParams,
  CreateVehicleUseCaseResponse
>;
