import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MockSensorEventsService as SensorEventsService } from './mock-sensor-events.service';

@WebSocketGateway({
  ...(process.env.CORS_ENABLED ? { cors: '*' } : {})
})
export class SensorsGateway {
  constructor(private readonly sensorEventService: SensorEventsService) {}

  @WebSocketServer() private server: Server;

  private logger: Logger = new Logger('MessageGateway');  

  async afterInit(server: Server) {}

  async handleConnection(client: any) {
    this.logger.log('SensorsGateway - Client connected:', client.id);    
    // Toggle sensors every 10 secs to demonstrate status updates.
    setInterval(async () => {
      const payload = await this.sensorEventService.getNextSensorEvent();
      this.server.emit('updateSensorEvent', payload);
    }, 10000);    
  }

  handleDisconnect(client: any) {
    this.logger.log('SensorsGateway - Client disconnected:', client.id);
  }

  @SubscribeMessage('updateSensorEvent')
  handleMessage(client: any, payload: string) {
    this.logger.log('handleMessage - payload:', payload);
    return 'received';
  }
}
