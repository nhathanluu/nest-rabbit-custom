"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqProviders = void 0;
const amqp = require("amqplib");
exports.RabbitmqProviders = [
    {
        provide: 'RABBIT_CONNECTION',
        inject: ['RABBIT_CONFIG'],
        useFactory: async (config) => {
            const connection = await amqp.connect(config.url);
            return connection;
        }
    }
];
//# sourceMappingURL=rabbitmq.provider.js.map