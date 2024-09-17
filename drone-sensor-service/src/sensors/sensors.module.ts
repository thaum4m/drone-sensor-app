import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SensorEventsService } from './sensor-events.service';
import { SensorsController } from './sensors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sensor } from '../entities/sensor.entity';
import { SensorsGateway } from './sensors.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor])],
  controllers: [SensorsController],
  providers: [
    SensorsService,
    SensorEventsService,
    SensorsGateway,
  ],
})
export class SensorsModule {}
