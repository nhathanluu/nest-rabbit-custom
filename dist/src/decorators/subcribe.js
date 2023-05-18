"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscribe = void 0;
const common_1 = require("@nestjs/common");
const Subscribe = (topic) => {
    return (target, propertyKey, descriptor) => {
        (0, common_1.SetMetadata)('RABBITMQ_SUBSCRIBER', {
            topic,
            target: target.constructor.name,
            methodName: propertyKey,
            callback: descriptor.value,
        })(target, propertyKey, descriptor);
    };
};
exports.Subscribe = Subscribe;
//# sourceMappingURL=subcribe.js.map