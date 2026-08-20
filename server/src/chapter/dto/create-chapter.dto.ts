import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChapterDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "Chapter 1" })
    title!: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "Chapter 1 is about variables" })
    description!: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: "12342412324asd2123" })
    courseId!: string;
}
