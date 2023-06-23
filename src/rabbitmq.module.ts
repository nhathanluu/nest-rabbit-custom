import { DynamicModule, Inject, Module, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { RabbitmqProviders } from "./rabbitmq.provider";
import { RabbitmqService } from "./rabbitmq.service";
import { groupBy } from 'rxjs';
import { Channel, Connection } from "amqplib";
import { ExternalContextCreator } from "@nestjs/core";
@Module({})
export class RabbitmqModule implements OnApplicationBootstrap {
    constructor(
        private readonly discover: DiscoveryService,
        private readonly rabbitmqService: RabbitmqService,
        @Inject('RABBIT_CONNECTION')
        private readonly connection: Connection,
        @Inject('RABBIT_CHANNEL')
        private readonly channel: Channel,
        private readonly externalContextCreator: ExternalContextCreator,
    ) { }
    async onApplicationBootstrap() {
        const meta = await this.discover.providerMethodsWithMetaAtKey('RABBITMQ_SUBSCRIBER');

        for (const data of meta) {
            const handle = this.externalContextCreator.create(
                data.discoveredMethod.parentClass.instance,
                data.discoveredMethod.handler,
                data.discoveredMethod.methodName
            )
            await this.channel.consume((data.meta as any).topic, async msg => {
                await handle(msg.content.toString());

                this.channel.ack(msg);
            });
        }
    }

    static register(options: Record<string, any>): DynamicModule {
        return {
            module: RabbitmqModule,
            imports: [
                DiscoveryModule,
            ],
            providers: [
                {
                    provide: 'RABBIT_CONFIG',
                    useValue: options
                },
                ...RabbitmqProviders,
                RabbitmqService,
            ],
            exports: [
                RabbitmqService,
            ]
        }
    }
}