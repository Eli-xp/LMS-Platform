import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class DeleteLessonDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: Types.ObjectId, required: true, example:'1j23131y31hy2'})
    chapterId!: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: Types.ObjectId, required: true, example:'1j23131y31hy2'})
    lessonId!: string
}