import { Inject, Injectable } from "@nestjs/common";
import { Channel, Connection } from "amqplib";

@Injectable()
export class RabbitmqService {
    constructor (
        @Inject('RABBIT_CONNECTION')
        private connection: Connection,
    ) {}

    async subcribe (config: any) {
        const channel: Channel = await this.connection.createChannel();

        await channel.consume(config.topic, async  (msg) => {
            await config.callback(msg.content.toString());

            channel.ack(msg);
        })
    }
}