import { Connection, Channel } from "amqplib";
import * as amqp from 'amqplib';

export const RabbitmqProviders = [
    {
        provide: 'RABBIT_CONNECTION',
        inject: ['RABBIT_CONFIG'],
        useFactory: async (config: any) => {
            const connection: Connection = await amqp.connect(
                config.url
            );

            return connection;
        }
    },
    {
        provide: 'RABBIT_CHANNEL',
        inject: ['RABBIT_CONNECTION'],
        useFactory: async (connection: Connection) => {
            const channel: Channel = await connection.createChannel();

            return channel;
        }
    }
]