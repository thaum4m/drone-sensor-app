import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from '../entities/sensor.entity';
import { UpdateSensorDto } from './dto/update-sensor.dto';

@Injectable()
export class SensorsService {
  constructor(
    @InjectRepository(Sensor)
    private readonly sensorRepository: Repository<Sensor>,
  ) {}

  async findAll(): Promise<Sensor[]> {
    return await this.sensorRepository.find({
      order: {
        name: 'ASC',
      }
    });
  }

  async findBySerial(serialNumber: string): Promise<Sensor> {
    return await this.sensorRepository.findOneBy({ serialNumber });
  }

  async updateById(id: number, updateSensorDto: UpdateSensorDto) {
    return await this.sensorRepository.update(id, updateSensorDto);
  }
}
