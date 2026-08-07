import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class OtpVerify {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, required: true, maxLength: 6, example: '965884'})
    code!: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: String, required: true, example: '09363241408'})
    phone!: string
}
