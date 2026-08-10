import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example:'what is nestJs'})
    title!: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example:'this course is about working with...'})
    description!: string;
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({type: Number,required: true,example: 499})
    price!: number;
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, required: true, enum:['Draft','Published','Archived'], default:'Archived'})
    level!: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example: 'Programming'})
    category!: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, example: 'about js...'})
    smallDescription!: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true})
    slug!: string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, required: true, enum: ['Draft', 'Published', 'Archived'], default: 'Draft'})
    status!: string
}
