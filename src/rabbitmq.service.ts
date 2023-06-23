import { Inject, Injectable } from "@nestjs/common";
import { Channel, Connection } from "amqplib";
import { IPublish } from "./interfaces/publish.interface";

@Injectable()
export class RabbitmqService {
    constructor (
        @Inject('RABBIT_CONNECTION')
        private connection: Connection,
        @Inject('RABBIT_CHANNEL')
        private channel: Channel,
    ) {
    }

    async subcribe (config: any) {;

        await this.channel.consume(config.meta.topic, async  (msg) => {
            await config.discoveredMethod.handler(msg.content.toString());

            this.channel.ack(msg);
        })
    }

    async publish (data: IPublish) {
        const message = Buffer.from(data.content, 'utf-8');
        
        this.channel.publish(data.exchange, data.routingKey, message, data.options)
    }
}