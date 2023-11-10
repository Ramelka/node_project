import {Module} from '@nestjs/common';
import {UserController} from "./user.controller";
import {RabbitMQModule} from "../rabbit-mq/rabbit-mq.module";
import {DatabaseModule} from "../database/database.module";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schema/user.schema";
import {UserService} from "./services/user.service";
import {FilesModule} from "../files/files.module";

@Module({
    imports: [
        RabbitMQModule,
        DatabaseModule,
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        FilesModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {
}
