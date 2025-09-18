import { UseCase } from 'src/share/contracts/usecase';

export type FindOneVehicleUseCaseParams = {
  id: string;
};

export type FindOneVehicleUseCaseResponse = {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
};

export type IFindOneVehicleUseCase = UseCase<
  FindOneVehicleUseCaseParams,
  FindOneVehicleUseCaseResponse
>;
