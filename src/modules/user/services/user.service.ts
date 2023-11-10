import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {UserInterface} from "../interfaces/user.interface";
import {CreateUserDTO} from "../DTOS/CreateUser.DTO";
import {RabbitMQService} from "../../rabbit-mq/services/rabbit-mq.service";
import {FilesService} from "../../files/services/files.service";
import * as fs from "fs";
import * as path from "path";

export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<UserInterface>,
        private readonly rabbitMQService: RabbitMQService,
        private readonly fileService: FilesService
    ) {
    }

    async create(createStudentDto: CreateUserDTO, file: any): Promise<UserInterface> {
        try {
            createStudentDto.avatar = Buffer.from(file.buffer).toString('base64')

            const user = new this.userModel(createStudentDto);
            await user.save();

            const fileName = String(user._id) + path.extname(file.originalname);
            await this.fileService.saveImage(fileName, file.buffer);

            this.rabbitMQService.send('rabbit-mq-producer', {
                message: "hello",
            })

            return user;
        } catch (error) {
            console.log(error)
        }
    }

    async getOne(id: string) {
        try {
            const user = this.userModel.findById(id).exec();

            if (!user) {
                throw new Error('User not found')
            }

            return user;
        } catch (error) {
            console.log(error)
        }
    }

    async getAvatarByUserId(id: string) {
        const file = this.getAvatarFromStorage(id);

        if (!file) {
            const avatar = (await this.getOne(id)).avatar;

            const fileBuffer = Buffer.from(avatar, 'base64');

            this.fileService.saveImage(`${id}.png`, fileBuffer)

            return avatar;
        }

        return file
    }

    private getAvatarFromStorage(id: string) {
        const filePath = path.resolve('storage', 'avatars', `${id}.png`);

        if (!fs.existsSync(filePath)) {
            return '';
        }

        return Buffer.from(fs.readFileSync(filePath)).toString('base64')
    }


    async delete(id: string) {
        try {
            await this.userModel.findByIdAndDelete(id).exec();

            const avatarPath = path.resolve('storage', 'avatars', `${id}.png`);

            if (fs.existsSync(avatarPath)) {
                fs.rmSync(avatarPath);
            }

            return {success: true}
        } catch (error) {
            throw new Error('User delete error')
        }
    }
}