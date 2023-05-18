import { SetMetadata } from "@nestjs/common";

export const Subscribe = (topic: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        SetMetadata<string, any>(
            'RABBITMQ_SUBSCRIBER',
            {
                topic,
                target: target.constructor.name,
                methodName: propertyKey,
                callback: descriptor.value,
            },
        )(target, propertyKey, descriptor);
    };
};