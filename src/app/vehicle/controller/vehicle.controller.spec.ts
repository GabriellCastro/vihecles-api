import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from '../service/vehicle.service';
import { CreateVehicleUseCase } from '../usecases/create.usecase';
import { FindAllVehiclesUseCase } from '../usecases/find-all.usecase';
import { FindOneVehicleUseCase } from '../usecases/find-one.usecase';
import { UpdateVehicleUseCase } from '../usecases/update.usecase';
import { DeleteVehicleUseCase } from '../usecases/delete.usecase';
import { VehicleRepository } from '../usecases/ports/repositories/vehicle.repository';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from '../entities/vehicle.entity';

describe('VehicleController', () => {
  let controller: VehicleController;
  let vehicleService: VehicleService;

  const mockVehicleEntity: VehicleEntity = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    placa: 'ABC-1234',
    chassi: '9BWZZZ377VT123456',
    renavam: '12345678901',
    modelo: 'Fusca',
    marca: 'Volkswagen',
    ano: 1968,
  };

  const mockCreateVehicleDto: CreateVehicleDto = {
    placa: 'ABC-1234',
    chassi: '9BWZZZ377VT123456',
    renavam: '12345678901',
    modelo: 'Fusca',
    marca: 'Volkswagen',
    ano: 1968,
  };

  const mockUpdateVehicleDto: UpdateVehicleDto = {
    modelo: 'Fusca 1300',
    ano: 1970,
  };

  const mockVehicleRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPrismaService = {
    vehicle: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
    $connect: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        VehicleService,
        CreateVehicleUseCase,
        FindAllVehiclesUseCase,
        FindOneVehicleUseCase,
        UpdateVehicleUseCase,
        DeleteVehicleUseCase,
        {
          provide: VehicleRepository,
          useValue: mockVehicleRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    vehicleService = module.get<VehicleService>(VehicleService);

    jest.clearAllMocks();
  });

  describe('Controller Definition', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have vehicleService injected', () => {
      expect(vehicleService).toBeDefined();
    });
  });

  describe('POST /vehicles - create()', () => {
    it('should create a new vehicle successfully', async () => {
      const expectedResponse = { message: 'VehicleCreatedSuccessfully' };
      jest.spyOn(vehicleService, 'create').mockResolvedValue(expectedResponse);

      const result = await controller.create(mockCreateVehicleDto);

      expect(vehicleService.create).toHaveBeenCalledWith({
        body: mockCreateVehicleDto,
      });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle create vehicle errors', async () => {
      const errorMessage = 'Failed to create vehicle';
      jest
        .spyOn(vehicleService, 'create')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.create(mockCreateVehicleDto)).rejects.toThrow(
        errorMessage,
      );
      expect(vehicleService.create).toHaveBeenCalledWith({
        body: mockCreateVehicleDto,
      });
    });
  });

  describe('GET /vehicles - findAll()', () => {
    it('should return all vehicles successfully', async () => {
      const expectedResponse = [mockVehicleEntity];
      jest.spyOn(vehicleService, 'findAll').mockResolvedValue(expectedResponse);

      const result = await controller.findAll();

      expect(vehicleService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should return empty array when no vehicles exist', async () => {
      const expectedResponse = [];
      jest.spyOn(vehicleService, 'findAll').mockResolvedValue(expectedResponse);

      const result = await controller.findAll();

      expect(vehicleService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });

    it('should handle findAll errors', async () => {
      const errorMessage = 'Failed to fetch vehicles';
      jest
        .spyOn(vehicleService, 'findAll')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.findAll()).rejects.toThrow(errorMessage);
      expect(vehicleService.findAll).toHaveBeenCalled();
    });
  });

  describe('GET /vehicles/:id - findOne()', () => {
    const vehicleId = '550e8400-e29b-41d4-a716-446655440000';

    it('should return a vehicle by id successfully', async () => {
      jest
        .spyOn(vehicleService, 'findOne')
        .mockResolvedValue(mockVehicleEntity);

      const result = await controller.findOne(vehicleId);

      expect(vehicleService.findOne).toHaveBeenCalledWith({ id: vehicleId });
      expect(result).toEqual(mockVehicleEntity);
    });

    it('should handle vehicle not found', async () => {
      const errorMessage = 'VehicleNotFound';
      jest
        .spyOn(vehicleService, 'findOne')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.findOne(vehicleId)).rejects.toThrow(errorMessage);
      expect(vehicleService.findOne).toHaveBeenCalledWith({ id: vehicleId });
    });

    it('should handle invalid vehicle id format', async () => {
      const invalidId = 'invalid-id';
      const errorMessage = 'Invalid vehicle ID format';
      jest
        .spyOn(vehicleService, 'findOne')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.findOne(invalidId)).rejects.toThrow(errorMessage);
      expect(vehicleService.findOne).toHaveBeenCalledWith({ id: invalidId });
    });
  });

  describe('PATCH /vehicles/:id - update()', () => {
    const vehicleId = '550e8400-e29b-41d4-a716-446655440000';

    it('should update a vehicle successfully', async () => {
      const expectedResponse = { message: 'VehicleUpdatedSuccessfully' };
      jest.spyOn(vehicleService, 'update').mockResolvedValue(expectedResponse);

      const result = await controller.update(vehicleId, mockUpdateVehicleDto);

      expect(vehicleService.update).toHaveBeenCalledWith({
        id: vehicleId,
        body: mockUpdateVehicleDto,
      });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle vehicle not found during update', async () => {
      const errorMessage = 'VehicleNotFound';
      jest
        .spyOn(vehicleService, 'update')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.update(vehicleId, mockUpdateVehicleDto),
      ).rejects.toThrow(errorMessage);
      expect(vehicleService.update).toHaveBeenCalledWith({
        id: vehicleId,
        body: mockUpdateVehicleDto,
      });
    });

    it('should handle update with empty body', async () => {
      const emptyUpdateDto = {};
      const expectedResponse = { message: 'VehicleUpdatedSuccessfully' };
      jest.spyOn(vehicleService, 'update').mockResolvedValue(expectedResponse);

      const result = await controller.update(vehicleId, emptyUpdateDto);

      expect(vehicleService.update).toHaveBeenCalledWith({
        id: vehicleId,
        body: emptyUpdateDto,
      });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle update validation errors', async () => {
      const invalidUpdateDto = { ano: -1 }; // Invalid year
      const errorMessage = 'Validation failed';
      jest
        .spyOn(vehicleService, 'update')
        .mockRejectedValue(new Error(errorMessage));

      await expect(
        controller.update(vehicleId, invalidUpdateDto),
      ).rejects.toThrow(errorMessage);
      expect(vehicleService.update).toHaveBeenCalledWith({
        id: vehicleId,
        body: invalidUpdateDto,
      });
    });
  });

  describe('DELETE /vehicles/:id - remove()', () => {
    const vehicleId = '550e8400-e29b-41d4-a716-446655440000';

    it('should delete a vehicle successfully', async () => {
      const expectedResponse = { message: 'VehicleDeletedSuccessfully' };
      jest.spyOn(vehicleService, 'remove').mockResolvedValue(expectedResponse);

      const result = await controller.remove(vehicleId);

      expect(vehicleService.remove).toHaveBeenCalledWith({ id: vehicleId });
      expect(result).toEqual(expectedResponse);
    });

    it('should handle vehicle not found during deletion', async () => {
      const errorMessage = 'VehicleNotFound';
      jest
        .spyOn(vehicleService, 'remove')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.remove(vehicleId)).rejects.toThrow(errorMessage);
      expect(vehicleService.remove).toHaveBeenCalledWith({ id: vehicleId });
    });

    it('should handle deletion errors', async () => {
      const errorMessage = 'Failed to delete vehicle';
      jest
        .spyOn(vehicleService, 'remove')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.remove(vehicleId)).rejects.toThrow(errorMessage);
      expect(vehicleService.remove).toHaveBeenCalledWith({ id: vehicleId });
    });

    it('should handle invalid vehicle id during deletion', async () => {
      const invalidId = 'invalid-id';
      const errorMessage = 'Invalid vehicle ID format';
      jest
        .spyOn(vehicleService, 'remove')
        .mockRejectedValue(new Error(errorMessage));

      await expect(controller.remove(invalidId)).rejects.toThrow(errorMessage);
      expect(vehicleService.remove).toHaveBeenCalledWith({ id: invalidId });
    });
  });

  describe('Error Handling', () => {
    it('should handle service layer errors properly', async () => {
      const serviceError = new Error('Service unavailable');
      jest.spyOn(vehicleService, 'findAll').mockRejectedValue(serviceError);

      await expect(controller.findAll()).rejects.toThrow('Service unavailable');
    });

    it('should propagate validation errors from service layer', async () => {
      const validationError = new Error('Invalid data format');
      jest.spyOn(vehicleService, 'create').mockRejectedValue(validationError);

      await expect(controller.create(mockCreateVehicleDto)).rejects.toThrow(
        'Invalid data format',
      );
    });
  });
});
