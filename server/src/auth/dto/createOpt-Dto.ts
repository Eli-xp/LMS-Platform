import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOtp {
  @IsNotEmpty({message:'phone number cant be empty'})
  @IsString({message:'the value should be string'})
  @MinLength(11,{message:'phone number is not valid'})
  @MaxLength(11,{message:'phone number is not valid'})
  @ApiProperty({ type: String, required: true, example: '09363241408' })
  phone!: string;
}
