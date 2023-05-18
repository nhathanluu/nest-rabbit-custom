import { Connection } from "amqplib";
export declare const RabbitmqProviders: {
    provide: string;
    inject: string[];
    useFactory: (config: any) => Promise<Connection>;
}[];
