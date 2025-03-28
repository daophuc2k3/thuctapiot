import { MqttContext } from '@nestjs/microservices';
import { MqttGateway } from './mqtt.gateway';
export declare class MqttController {
    private mqttGateway;
    constructor(mqttGateway: MqttGateway);
    handleComingMessageFromBroker(data: any, context: MqttContext): void;
}
