import {Module} from '@nestjs/common';
import {RabbitMQModule} from "./modules/rabbit-mq/rabbit-mq.module";
import {UserModule} from "./modules/user/user.module";
import {DatabaseModule} from "./modules/database/database.module";
import {FilesModule} from "./modules/files/files.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        RabbitMQModule,
        UserModule,
        DatabaseModule,
        FilesModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
