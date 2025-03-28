import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
export declare class MqttGateway implements OnGatewayConnection, OnGatewayDisconnect {
    static clients: {
        [key: string]: Socket;
    };
    handleMessage(message: any, client: Socket): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    emitDataToClient(data: any): void;
}
