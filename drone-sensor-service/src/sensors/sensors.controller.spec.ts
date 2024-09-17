import { Test, TestingModule } from '@nestjs/testing';
import { SensorsController } from './sensors.controller';
import { Sensor } from '../entities/sensor.entity';
import { SensorsService } from './sensors.service';

describe('SensorsController', () => {
  let controller: SensorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsController],
      providers: [
        {
          provide: SensorsService,
          useValue: {
            findAll: (): Sensor[] => {
              return [
                Object.assign(new Sensor(), { id: 1, serialNumber: '123abc' }),
                Object.assign(new Sensor(), { id: 2, serialNumber: '123abd' }),
              ];
            }
          }
        }
      ],
    }).compile();

    controller = module.get<SensorsController>(SensorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all sensors', async () => {
    const sensors = await controller.findAll();
    expect(sensors).toHaveLength(2);
  });
});
