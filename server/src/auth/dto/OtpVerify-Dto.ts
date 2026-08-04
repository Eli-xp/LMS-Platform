import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OtpVerify {
    @IsNotEmpty()
    @IsString()
    code!: string
    @IsNotEmpty()
    @IsString()
    phone!: string
}
