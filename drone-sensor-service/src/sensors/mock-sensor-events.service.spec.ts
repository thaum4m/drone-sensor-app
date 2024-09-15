import { Test, TestingModule } from '@nestjs/testing';
import { MockSensorEventsService } from './mock-sensor-events.service';

describe('MockSensorEventsService', () => {
  let service: MockSensorEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MockSensorEventsService],
    }).compile();

    service = module.get<MockSensorEventsService>(MockSensorEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
