"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RabbitmqModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitmqModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_discovery_1 = require("@golevelup/nestjs-discovery");
const rabbitmq_provider_1 = require("./rabbitmq.provider");
const rabbitmq_service_1 = require("./rabbitmq.service");
let RabbitmqModule = RabbitmqModule_1 = class RabbitmqModule {
    constructor(discover, rabbitmqService) {
        this.discover = discover;
        this.rabbitmqService = rabbitmqService;
    }
    async onModuleInit() {
        const subscribers = await this.discover.controllerMethodsWithMetaAtKey('RABBITMQ_SUBSCRIBER');
        subscribers.map(subscriber => {
            this.rabbitmqService.subcribe(subscriber.meta);
        });
    }
    static register(options) {
        return {
            module: RabbitmqModule_1,
            imports: [
                nestjs_discovery_1.DiscoveryModule,
            ],
            providers: [
                {
                    provide: 'RABBIT_CONFIG',
                    useValue: options
                },
                ...rabbitmq_provider_1.RabbitmqProviders,
                rabbitmq_service_1.RabbitmqService,
            ],
            exports: [
                rabbitmq_service_1.RabbitmqService,
            ]
        };
    }
};
RabbitmqModule = RabbitmqModule_1 = __decorate([
    (0, common_1.Module)({}),
    __metadata("design:paramtypes", [nestjs_discovery_1.DiscoveryService,
        rabbitmq_service_1.RabbitmqService])
], RabbitmqModule);
exports.RabbitmqModule = RabbitmqModule;
//# sourceMappingURL=rabbitmq.module.js.map