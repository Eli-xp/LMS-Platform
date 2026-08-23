import { IsArray, IsOptional } from "class-validator";

export class StructureDto{
    @IsArray()
    @IsOptional()
    chapters?:{
        id: string
        position: number
        title: string
    }[];
    @IsArray()
    @IsOptional()
    lessons?:{
        id: string
        position: number
        title: string
    }[];
}