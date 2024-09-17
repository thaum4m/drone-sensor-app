import { Test, TestingModule } from '@nestjs/testing';
import { SensorsGateway } from './sensors.gateway';
import { INestApplication } from '@nestjs/common';
import { SensorEventsService } from './sensor-events.service';

describe('SensorsGateway', () => {
  let gateway: SensorsGateway;
  let sensorEventsService: SensorEventsService;
  let app: INestApplication;

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', async() => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsGateway,
        {          
          provide: SensorEventsService,
          // Additional services are not used until gateway is run, so provide
          // empty implementation.
          useValue: {}
        }
      ]
    }).compile();
    gateway = module.get<SensorsGateway>(SensorsGateway);

    expect(gateway).toBeDefined();
  });

  it('should emit updates', async () => {
    const emitUpdates = jest.fn(function*() {
      yield {}; // Payload would be returned here.
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorsGateway,
        {
          provide: SensorEventsService,
          useValue: { emitUpdates }
        }
      ],
    }).compile();    

    gateway = module.get<SensorsGateway>(SensorsGateway);
    sensorEventsService = module.get<SensorEventsService>(SensorEventsService);
    app = module.createNestApplication();

    await app.init(); // Manually trigger Gateway afterInit().
    expect(sensorEventsService.emitUpdates).toHaveBeenCalledTimes(1);
  });

});
