import { UseCase } from 'src/share/contracts/usecase';
import { UpdateVehicleDto } from '../../controller/dto/update-vehicle.dto';

export type UpdateVehicleUseCaseParams = {
  id: string;
  body: UpdateVehicleDto;
};

export type UpdateVehicleUseCaseResponse = {
  message: string;
};

export type IUpdateVehicleUseCase = UseCase<
  UpdateVehicleUseCaseParams,
  UpdateVehicleUseCaseResponse
>;
