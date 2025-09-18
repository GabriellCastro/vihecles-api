import { Injectable } from '@nestjs/common';
import { IVehicleDomain } from 'src/app/vehicle/domain/vehicle.domain';
import { VehicleEntity } from 'src/app/vehicle/entities/vehicle.entity';
import { PrismaService } from '../../../../../services/prisma/prisma.service';
import { CreationModel } from 'src/share/contracts/creationModel';
import { PartialModel } from 'src/share/contracts/partialModel';
import { UpdateModel } from 'src/share/contracts/updateModel';

export interface IVehicleRepository {
  create(data: CreationModel<IVehicleDomain>): Promise<VehicleEntity>;
  findAll(): Promise<[VehicleEntity[], number]>;
  findOne(where: PartialModel<IVehicleDomain>): Promise<VehicleEntity | null>;
  update(
    where: PartialModel<VehicleEntity>,
    data: UpdateModel<IVehicleDomain>,
  ): Promise<VehicleEntity | null>;
  remove(id: string): Promise<void>;
}

@Injectable()
export class VehicleRepository implements IVehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreationModel<IVehicleDomain>): Promise<VehicleEntity> {
    return this.prisma.vehicle.create({ data });
  }

  async findAll(): Promise<[VehicleEntity[], number]> {
    const [items, count] = await this.prisma.$transaction([
      this.prisma.vehicle.findMany(),
      this.prisma.vehicle.count(),
    ]);
    return [items, count];
  }

  async findOne(
    where: PartialModel<IVehicleDomain>,
  ): Promise<VehicleEntity | null> {
    return this.prisma.vehicle.findFirst({ where });
  }

  async update(
    where: PartialModel<VehicleEntity>,
    data: UpdateModel<IVehicleDomain>,
  ): Promise<VehicleEntity | null> {
    const vehicle = await this.prisma.vehicle.findFirst({ where });
    if (!vehicle) {
      return null;
    }
    return this.prisma.vehicle.update({
      where: { id: vehicle.id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.vehicle.delete({ where: { id } });
  }
}
