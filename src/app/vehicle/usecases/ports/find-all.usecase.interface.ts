import { UseCase } from 'src/share/contracts/usecase';

export type FindAllVehiclesUseCaseParams = void;

export type FindAllVehiclesUseCaseResponse = {
  id: string;
  placa: string;
  chassi: string;
  renavam: string;
  modelo: string;
  marca: string;
  ano: number;
}[];

export type IFindAllVehiclesUseCase = UseCase<
  FindAllVehiclesUseCaseParams,
  FindAllVehiclesUseCaseResponse
>;
