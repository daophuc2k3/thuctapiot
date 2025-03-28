import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttGateway } from './mqtt.gateway';
@Module({
  controllers: [MqttController],
  providers: [ MqttGateway],  // Kết nối với service và gateway
})
export class MqttModule {}
