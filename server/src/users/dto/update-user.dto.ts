import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
    @IsEmail()
    @IsNotEmpty()
    email!: string;
    @IsObject()
    @IsOptional()
    profileImage!: {
        originalname: string;
        contentType: string;
    }
}
