import { DynamicModule, OnModuleInit } from "@nestjs/common";
import { DiscoveryService } from '@golevelup/nestjs-discovery';
import { RabbitmqService } from "./rabbitmq.service";
export declare class RabbitmqModule implements OnModuleInit {
    private readonly discover;
    private readonly rabbitmqService;
    constructor(discover: DiscoveryService, rabbitmqService: RabbitmqService);
    onModuleInit(): Promise<void>;
    static register(options: Record<string, any>): DynamicModule;
}
