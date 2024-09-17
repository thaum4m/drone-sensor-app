import { Test, TestingModule } from '@nestjs/testing';
import { SensorEventsService } from './sensor-events.service';
import { SensorsService } from './sensors.service';

describe('SensorEventsService', () => {
  let sensorEventsService: SensorEventsService;
  let sensorsService: SensorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorEventsService,
        {
          provide: SensorsService,
          useValue: {
            findAll: jest.fn(() => ([
              { 
                name: 'sensor-1',
                serialNumber: '123abc',
                firmwareVer: '1.1.1',
                status: 'online',
              },
              { 
                name: 'sensor-2',
                serialNumber: '124abd',
                firmwareVer: '1.2.1',
                status: 'online',
              },
            ])),
          }
        }
      ],
    }).compile();

    sensorEventsService = module.get<SensorEventsService>(SensorEventsService);
    sensorsService = module.get<SensorsService>(SensorsService);
  });

  it('should be defined', () => {
    expect(sensorEventsService).toBeDefined();
  });

  describe('getNextSensorEvent', () => {
    it('should get all registered events only once', async () => {
      await sensorEventsService.getNextSensorEvent();
      await sensorEventsService.getNextSensorEvent();
      expect(sensorsService.findAll).toHaveBeenCalledTimes(1);
    });
  
    it('should toggle status of next event', async () => {
      const payload = await sensorEventsService.getNextSensorEvent();
      expect(payload).toEqual({ 
        name: 'sensor-1',
        serialNumber: '123abc',
        firmwareVer: '1.1.1',
        status: 'offline',
      });
    });
  });
  
});
