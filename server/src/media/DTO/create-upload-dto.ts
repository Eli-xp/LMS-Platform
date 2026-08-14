import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUploadUrlDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example: 'flower.png'})
    originalName!: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example: 'image/png'})
    contentType!: string;
}