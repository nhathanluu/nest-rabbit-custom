import { DynamicModule, Module, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { RabbitmqProviders } from "./rabbitmq.provider";
import { RabbitmqService } from "./rabbitmq.service";

@Module({})
export class RabbitmqModule implements OnModuleInit {
    constructor(
        private readonly discover: DiscoveryService,
        private readonly rabbitmqService: RabbitmqService,
    ) { }

    async onModuleInit() {
        // find everything marked with @Subscribe
        const subscribers = await this.discover.controllerMethodsWithMetaAtKey<any>('RABBITMQ_SUBSCRIBER');

        subscribers.map(subscriber => {
            this.rabbitmqService.subcribe(subscriber.meta)
        });
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