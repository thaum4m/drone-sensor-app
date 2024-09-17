import { INestApplicationContext, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions } from "socket.io";

export class SocketIOAdapter extends IoAdapter {
    private readonly logger = new Logger(SocketIOAdapter.name);

    constructor(
        private app: INestApplicationContext,
        private configService: ConfigService,
    ) {
        super(app);
    }

    // CORS is from ConfigService instead of hardcoding in `@WebSocketGateway`.
    createIOServer(port: number, options?: ServerOptions) {
        let cors = {};
        if (this.configService.get('CORS_ENABLED') === 'true') {
            const clientPort = this.configService.get<number>('CORS_CLIENT_PORT');
            cors = {
                origin: [
                    `http://localhost:${clientPort}`,
                    new RegExp(`/^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):${clientPort}$/`),
                ],
            };
            this.logger.debug('Configuring SocketIO server with custom CORS options.', {
                cors
            });
        }

        const server = super.createIOServer(port, {
            ...options,
            cors,
        });
        return server;
    }
}