import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { MqttGateway } from './mqtt.gateway';

@Controller('mqtt')
export class MqttController {
  constructor(private mqttGateway: MqttGateway){}
  
  @MessagePattern('sensor_data')
  handleComingMessageFromBroker(@Payload() data, @Ctx() context: MqttContext){
    this.mqttGateway.emitDataToClient(data);
  }
}
