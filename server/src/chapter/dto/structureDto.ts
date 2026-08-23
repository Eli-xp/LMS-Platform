import {  ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";

export class StructureDto{
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