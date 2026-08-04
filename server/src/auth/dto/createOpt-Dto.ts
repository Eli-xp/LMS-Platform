import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateOtp{
    @IsNotEmpty()
    @IsString()
    phone!:string
}