import { IsNotEmpty, IsString } from "class-validator";

export class CreateUploadUrlDto {
    @IsString()
    @IsNotEmpty()
    originalName!: string;
    @IsString()
    @IsNotEmpty()
    contentType!: string;
}