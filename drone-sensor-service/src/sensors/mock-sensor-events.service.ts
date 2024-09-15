import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from '../entities/sensor.entity';
import { SensorEventDto } from './dto/sensor-event.dto';
import { faker } from "@faker-js/faker";
import { SensorStatus } from 'src/types';

@Injectable()
export class MockSensorEventsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,    
  ) {}

  private sensorEvents: SensorEventDto[] = null;
  private sensorEventIndex = -1;

  // Could hardcode serials in seeder to avoid querying them for mock service.
  private async findAll(): Promise<SensorEventDto[]> {    
    // Mock implementation for getting sensor events.
    const sensors = await this.sensorRepository.find();

    const sensorEvents = sensors.map(sensor => {
      const sensorEvent = new SensorEventDto();      
      sensorEvent.name = sensor.name;
      sensorEvent.serialNumber = sensor.serialNumber;
      sensorEvent.firmwareVer = sensor.firmwareVer;
      sensorEvent.status = sensor.status;
      return sensorEvent;
    });

    return sensorEvents;
  }

  /**
   * Returns a Sensor Event from a mock device.
   * For testing events are ordered unlike with real devices.
   */
  async getNextSensorEvent(): Promise<SensorEventDto> {
    if (this.sensorEvents === null) {
      this.sensorEvents = await this.findAll();
    }

    if (this.sensorEventIndex >= this.sensorEvents.length-1) {
      this.sensorEventIndex = 0;
    } else {
      this.sensorEventIndex++;
    }
      
    const sensorEvent = this.sensorEvents[this.sensorEventIndex];
    sensorEvent.status = sensorEvent.status === SensorStatus.Online ?
      SensorStatus.Offline : SensorStatus.Online;
    return sensorEvent;
  }
}
