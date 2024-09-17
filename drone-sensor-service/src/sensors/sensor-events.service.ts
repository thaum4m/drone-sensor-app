import { Injectable, Logger } from '@nestjs/common';
import { Sensor } from '../entities/sensor.entity';
import { SensorEventDto } from './dto/sensor-event.dto';
import { SensorEmitOptions, SensorStatus } from '../types';
import { Server } from 'socket.io';
import { SensorsService } from './sensors.service';

@Injectable()
export class SensorEventsService {
  constructor(    
    private readonly sensorsService: SensorsService,
  ) {}

  private readonly logger: Logger = new Logger(SensorEventsService.name);

  private sensorEvents: SensorEventDto[] = null;
  private sensorEventIndex = -1;

  /**
   * Emit test sensor updates to all connected clients.
   */
  async *emitUpdates(
    server: Server,
    options?: SensorEmitOptions
  ) {
    const { delayMs=5000, max=-1 } = options ?? {};
    const delay = (ms: number) => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    for (let i = 0; (i < max || max === -1); i++) {
      const payload = await this.getNextSensorEvent();
      
      // Find existing record by serial and update it.
      const sensor: Sensor = await this.sensorsService
        .findBySerial(payload.serialNumber);
      if (!sensor) {
        // Sensor event was received that has never been registered!
        yield {
          isRegistered: false,
          error: `Sensor is not registered`,
          payload,
        }
      }
      // Persist 
      await this.sensorsService.updateById(sensor.id, {
        status: payload.status as SensorStatus,
        // Add other fields to update in the future.
      });

      await delay(delayMs);
      this.logger.debug(`SensorEventsService - Emit update #${i} - payload`,
        JSON.stringify(payload));
      // Send 'updateSensorEvent' to all clients.
      server.emit('updateSensorEvent', payload);

      yield {
        isRegistered: true, // Already exists in the system.
        payload: payload, // Payload sent to clients.
      }
    }
  }

  /**
   * Returns a Sensor Event from a "mock device".
   * Test events are ordered unlike with real devices.
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

  /**
   * Mock implementation for getting all registered sensor events.
   */
  async findAll(): Promise<SensorEventDto[]> {    
    // Could hardcode serials in seeder to avoid querying them for mock service.
    const sensors: SensorEventDto[] = await this.sensorsService.findAll();

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
}
