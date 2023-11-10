import {Injectable, UploadedFile} from '@nestjs/common';
import {extname, resolve} from 'path';
import * as fs from "fs";

@Injectable()
export class FilesService {
    async saveImage(fileName: string, file: Buffer) {
        try {
            const newFilePath = resolve('storage', 'avatars', `${fileName}`);

            fs.writeFileSync(newFilePath, file);
        } catch (error) {
            console.log(error)
        }
    }
}
