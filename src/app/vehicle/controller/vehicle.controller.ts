import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleService } from '../service/vehicle.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a vehicle' })
  create(@Body() body: CreateVehicleDto) {
    return this.vehicleService.create({ body });
  }

  @Get()
  @ApiOperation({ summary: 'List all vehicles' })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a vehicle by ID' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Vehicle ID',
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne({ id });
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Vehicle ID',
    required: true,
  })
  @ApiOperation({ summary: 'Update a vehicle by ID' })
  update(@Param('id') id: string, @Body() body: UpdateVehicleDto) {
    return this.vehicleService.update({ id, body });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Vehicle ID',
    required: true,
  })
  @ApiOperation({ summary: 'Delete a vehicle by ID' })
  remove(@Param('id') id: string) {
    return this.vehicleService.remove({ id });
  }
}
