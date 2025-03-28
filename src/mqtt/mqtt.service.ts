// import { Injectable } from '@nestjs/common';
// import { ClientProxy, Client, Transport } from '@nestjs/microservices';
// import { WebSocketServer } from '@nestjs/websockets';
// // import { Server, Socket } from 'socket.io'; 
// import { MqttGateway } from './mqtt.gateway';
// import { io, Socket } from 'socket.io-client';
// @Injectable()
// export class MqttService {
//   // @Client({
//   //   transport: Transport.MQTT,  // Sử dụng MQTT transport
//   //   options: {
//   //     host: 'broker.emqx.io',  // Cấu hình MQTT broker
//   //     port: 1883,
//   //   },
//   // })
//   // private client: ClientProxy;  // Khởi tạo MQTT client
  
//   // Phương thức này dùng để gửi dữ liệu qua MQTT
//   // sendDataToMqtt(data: any) {
//   //   console.log('Sending data to MQTT broker:', data);
//   //   this.client.emit('sensor_data', data);  // Gửi dữ liệu tới MQTT broker
//   // }

//   // // Phương thức xử lý dữ liệu nhận được từ MQTT broker
//   // processSensorData(data: any) {
//   //   console.log('Processing sensor data:', data);
//   //   // Đây là nơi bạn xử lý dữ liệu từ MQTT trước khi phát đi qua WebSocket hoặc nơi khác
//   //   // Ví dụ: bạn có thể gửi lại dữ liệu tới WebSocket (nếu cần thiết)
//   //   // Tuy nhiên, phần này không liên quan đến WebSocket trực tiếp
//   //   // this.sendDataToMqtt(data);  // Gửi dữ liệu qua MQTT nếu cần
//   // }
//   constructor(private readonly mqttGateway: MqttGateway) {}
//   processSensorData(data: any) {
//     console.log('Processing sensor data:', data);
//     // Gửi dữ liệu tới WebSocket Gateway
//     this.mqttGateway.sendDataToClient(data);  // Gọi phương thức từ MqttGateway
//   }

// }
