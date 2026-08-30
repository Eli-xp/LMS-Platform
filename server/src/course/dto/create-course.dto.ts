import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString, Max } from "class-validator";
import { Trim } from "src/lesson/dto/create-lesson.dto";


export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({type: String, required: true, example:'what is nestJs'})
    title!: string
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({type: String, required: true, example:'this course is about working with...'})
    description!: string;
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number,required: true,example: 499})
    price!: number;
    @IsNotEmpty()
    @IsString()
    @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
    @ApiProperty({type: String, required: true, enum:['Beginner','Intermediate','Advanced'], default:'Beginner'})
    level!: string
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({type: String, required: true, example: 'Programming'})
    category!: string
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({type: String, required: true, example: 'about js...'})
    smallDescription!: string
    @IsString()
    @IsNotEmpty()
    @Trim()
    @ApiProperty({type: String, required: true})
    slug!: string
    @IsString()
    @IsNotEmpty()
    @IsEnum(['Draft', 'Published', 'Archived'])
    @ApiProperty({type: String, required: true, enum: ['Draft', 'Published', 'Archived'], default: 'Draft'})
    status!: string
    @IsObject()
    @IsNotEmpty()
    @ApiProperty({type:Object, required: true, example:{originalName:'test.png',contentType:'image/png'}})
    thumbNail!: {
        originalName: string,
        contentType: string
    }
    @IsNumber()
    @IsNotEmpty()
    @Max(5 * 1024 * 1024)
    @ApiProperty({type:Object, required: true, example:'5'})
    size!: number
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type:Number,required: true,example:8})
    duration!: number
}
