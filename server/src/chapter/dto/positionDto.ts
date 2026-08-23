import { IsArray, IsOptional } from "class-validator";

export class UpdatePositionDto{
    @IsArray()
    @IsOptional()
    chapters?:{
        id: string
        positions: number
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