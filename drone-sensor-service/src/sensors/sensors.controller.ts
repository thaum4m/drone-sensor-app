import { Controller, Get, Inject } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('api/sensors')
export class SensorsController {
  constructor(
    @Inject(SensorsService)
    private readonly sensorsService: SensorsService
  ) {}

  @Get()
  findAll() {
    return this.sensorsService.findAll();
  }
}
