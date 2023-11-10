import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    public name: string
    @IsString()
    @IsNotEmpty()
    public email: string
    @IsString()
    @IsOptional()
    public gender: string
    @IsString()
    @IsOptional()
    public avatar: string | null
}