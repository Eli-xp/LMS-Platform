import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmUploadDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example: 'jdk-awe-qes.png'})
    fileKey!: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example: '1225123sda62sdw123s62'})
    courseId!: string
}