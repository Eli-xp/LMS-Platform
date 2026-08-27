import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class DeleteChapterDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: Types.ObjectId, required: true, example: 'asdkjajksd12j31h23'})
    courseId!: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: Types.ObjectId, required: true, example:'asdkjajksd12j31h23'})
    chapterId!: string;
}