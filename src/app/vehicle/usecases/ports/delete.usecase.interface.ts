import { UseCase } from 'src/share/contracts/usecase';

export type DeleteVehicleUseCaseParams = {
  id: string;
};

export type DeleteVehicleUseCaseResponse = {
  message: string;
};

export type IDeleteVehicleUseCase = UseCase<
  DeleteVehicleUseCaseParams,
  DeleteVehicleUseCaseResponse
>;
