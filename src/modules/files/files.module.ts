import {Module} from '@nestjs/common';
import {FilesService} from './services/files.service';
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        MulterModule.register({
            dest: '../../../storage/files', // Define the destination directory for uploaded files
        }),
    ],
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule {
}
