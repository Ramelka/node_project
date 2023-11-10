import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {RabbitMQService} from "./services/rabbit-mq.service";
import * as process from "process";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'rabbit-mq-module',
                transport: Transport.RMQ,
                options: {
                    urls: [
                        'amqp://guest:guest@rabbitmq-host/test',
                    ],
                    queue: 'rabbit-mq-nest-js',
                },
            },
        ]),
    ],
    controllers: [],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule {
}
