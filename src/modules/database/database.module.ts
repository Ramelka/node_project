import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {DatabaseService} from "./services/database.service";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: '.env',
                })
            ],
            useFactory: async () => ({
                uri: `mongodb://${process.env.DB_HOST}`,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {
    constructor() {
        console.log(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`)
    }
}
