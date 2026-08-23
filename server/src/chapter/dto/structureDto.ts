import {  ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class StructureDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String})
    courseId!: string
    @IsArray()
    @IsOptional()
    @ApiProperty({type: [Object], example:[
        {id:'123asd',position:2, title:'test'},
        {id:'123asd',position:2, title:'test'},
        {id:'123asd',position:2, title:'test'}
    ]})
    chapters?:{
        id: string
        position: number
        title: string
    }[];
    @IsArray()
    @IsOptional()
    @ApiProperty({type: [Object], example:[
        {id:'123asd',position:2, title:'test'},
        {id:'123asd',position:2, title:'test'},
        {id:'123asd',position:2, title:'test'}
    ]})
    lessons?:{
        id: string
        position: number
        title: string
    }[];
}