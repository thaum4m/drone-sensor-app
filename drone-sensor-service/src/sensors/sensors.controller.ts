import { Controller, Get } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('api/sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }
}
