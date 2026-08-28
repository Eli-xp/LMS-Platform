import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsNotEmpty, IsString, IsOptional, IsIn } from "class-validator";

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "Lesson 1" })
    title!: string;
    @IsString()
    @IsOptional()
    @ApiProperty({ type: String,required: false, example: "this lesson is about OOP" })
    description?: string;
    @IsObject()
    @IsOptional()
    @IsIn([
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp'
    ])
    @ApiProperty({ type: Object,required: false, example: { originalname: "flower.png", contentType: "image/png" } })
    thumbnailObject?: {
        originalname: string;
        contentType: string;
    }
    @IsObject()
    @IsOptional()
    @ApiProperty({ type: Object,required: false, example: { originalname: "flower.mp4", contentType: "video/mp4" } })
    videoObject?: {
        originalname: string;
        contentType: string;
    }
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "114565asd5q55ws" })
    chapterId!: string
    
}
