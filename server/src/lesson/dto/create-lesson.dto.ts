import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "Lesson 1" })
    title!: string;
    @IsString()
    @IsOptional()
    @ApiProperty({ type: String, example: "this lesson is about OOP" })
    description?: string;
    @IsObject()
    @IsOptional()
    @ApiProperty({ type: Object, example: { originalname: "flower.png", contentType: "image/png" } })
    thumbnailObject?: {
        originalname: string;
        contentType: string;
    }
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "114565asd5q55ws" })
    chapterId!: string
    
}
