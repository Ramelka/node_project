import {Body, Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreateUserDTO} from "./DTOS/CreateUser.DTO";
import {UserService} from "./services/user.service";
import {FileInterceptor} from '@nestjs/platform-express';
import * as process from "process";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        return await this.userService.getOne(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('avatar'))
    async create(
        @Body() createUserDTO: CreateUserDTO,
        @UploadedFile() file: any,
        @Res() response: any,) {
        const user = await this.userService.create(createUserDTO, file);

        response.send(user)
    }

    @Get(':id/avatar')
    async uploadFile(@Param('id') id: string) {
        return await this.userService.getAvatarByUserId(id)
    }

    @Delete(':id/avatar')
    async delete(@Param('id') id: string) {
        return await this.userService.delete(id)
    }
}
