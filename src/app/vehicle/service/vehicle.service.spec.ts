import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { CreateVehicleUseCase } from '../usecases/create.usecase';
import { FindAllVehiclesUseCase } from '../usecases/find-all.usecase';
import { FindOneVehicleUseCase } from '../usecases/find-one.usecase';
import { UpdateVehicleUseCase } from '../usecases/update.usecase';
import { DeleteVehicleUseCase } from '../usecases/delete.usecase';

describe('VehicleService', () => {
  let service: VehicleService;

  const mockCreate = { execute: jest.fn() };
  const mockFindAll = { execute: jest.fn() };
  const mockFindOne = { execute: jest.fn() };
  const mockUpdate = { execute: jest.fn() };
  const mockDelete = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        { provide: CreateVehicleUseCase, useValue: mockCreate },
        { provide: FindAllVehiclesUseCase, useValue: mockFindAll },
        { provide: FindOneVehicleUseCase, useValue: mockFindOne },
        { provide: UpdateVehicleUseCase, useValue: mockUpdate },
        { provide: DeleteVehicleUseCase, useValue: mockDelete },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const dto = {
      body: {
        placa: 'ABC1234',
        chassi: 'CHASSI123456',
        renavam: 'RENAVAM123456',
        modelo: 'Modelo X',
        marca: 'Marca Y',
        ano: 2024,
      },
    };
    mockCreate.execute.mockResolvedValueOnce({ id: 1, ...dto.body });

    const result = await service.create(dto);

    expect(mockCreate.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: 1,
      placa: 'ABC1234',
      chassi: 'CHASSI123456',
      renavam: 'RENAVAM123456',
      modelo: 'Modelo X',
      marca: 'Marca Y',
      ano: 2024,
    });
  });

  it('should call findAll use case', async () => {
    mockFindAll.execute.mockResolvedValueOnce([{ id: 1 }]);

    const result = await service.findAll();

    expect(mockFindAll.execute).toHaveBeenCalledWith();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should call findOne use case', async () => {
    const params = { id: '1' };
    mockFindOne.execute.mockResolvedValueOnce({ id: 1 });

    const result = await service.findOne(params);

    expect(mockFindOne.execute).toHaveBeenCalledWith(params);
    expect(result).toEqual({ id: 1 });
  });

  it('should call update use case', async () => {
    const params = { id: '1', body: { placa: 'XYZ9999' } };
    mockUpdate.execute.mockResolvedValueOnce({ id: 1, placa: 'XYZ9999' });

    const result = await service.update(params);

    expect(mockUpdate.execute).toHaveBeenCalledWith(params);
    expect(result).toEqual({ id: 1, placa: 'XYZ9999' });
  });

  it('should call delete use case', async () => {
    const params = { id: '1' };
    mockDelete.execute.mockResolvedValueOnce({ deleted: true });

    const result = await service.remove(params);

    expect(mockDelete.execute).toHaveBeenCalledWith(params);
    expect(result).toEqual({ deleted: true });
  });
});
