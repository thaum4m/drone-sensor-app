import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SensorEventsService } from './sensor-events.service';

@WebSocketGateway()
export class SensorsGateway {
  constructor(private readonly sensorEventService: SensorEventsService) {}

  @WebSocketServer() private server: Server;

  private readonly logger: Logger = new Logger(SensorsGateway.name);  

  async afterInit(server: Server) {
    this.logger.log('SensorsGateway - afterInit() called');
    const updateGenerator = this.sensorEventService.emitUpdates(this.server);
    for await (let payload of updateGenerator) {
      this.logger.debug('SensorGateway - Emitted payload:', payload);
    }    
  }

  async handleConnection(client: any) {
    this.logger.debug('SensorsGateway - Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    this.logger.debug('SensorsGateway - Client disconnected:', client.id);
  }

  @SubscribeMessage('updateSensorEvent')
  handleMessage(client: any, payload: string) {
    this.logger.debug('handleMessage - payload:', payload);
    return 'received';
  }
}
