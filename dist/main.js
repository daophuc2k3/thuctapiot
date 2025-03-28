"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
async function bootstrap() {
    const appSocket = await core_1.NestFactory.create(app_module_1.AppModule);
    appSocket.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(appSocket));
    await appSocket.listen(3001);
    const appMqtt = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.MQTT,
        options: {
            host: 'broker.emqx.io',
            port: 1883,
        },
    });
    await appMqtt.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map