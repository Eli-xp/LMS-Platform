import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateOtp{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, required: true, example: '09363241408'})
    phone!:string
}