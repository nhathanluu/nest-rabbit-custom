import { Connection } from "amqplib";
export declare class RabbitmqService {
    private connection;
    constructor(connection: Connection);
    subcribe(config: any): Promise<void>;
}
