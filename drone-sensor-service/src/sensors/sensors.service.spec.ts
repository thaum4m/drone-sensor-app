import { Test, TestingModule } from '@nestjs/testing';
import { SensorsService } from './sensors.service';
import { Sensor } from '../entities/sensor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSensorDto } from './dto/update-sensor.dto';

describe('SensorsService', () => {
  let service: SensorsService;
  let sensorRepository: Repository<Sensor>;

  const SENSOR_REPOSITORY_TOKEN = getRepositoryToken(Sensor);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsService,
        {
          provide: SENSOR_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn(),
            update: jest.fn(),
          },
        }
      ],
    }).compile();

    service = module.get<SensorsService>(SensorsService);
    sensorRepository = module.get<Repository<Sensor>>(SENSOR_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sensorRepository should be defined', () => {
    expect(sensorRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should call sensor repository "find" with no params', async () => {
      await service.findAll();
      expect(sensorRepository.find).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('updateById', () => {
    it('should call sensor repository "update" with correct params', async () => {
      await service.updateById(1, {
        status: 'offline',
      } as UpdateSensorDto);
      expect(sensorRepository.update).toHaveBeenCalledWith(1, { status: 'offline' });
    });
  });
});
