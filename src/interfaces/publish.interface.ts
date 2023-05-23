export interface IPublish {
    exchange: string
    routingKey: string
    content: string
    options?: any
}