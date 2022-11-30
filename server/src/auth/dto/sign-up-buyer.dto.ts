import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpBuyerDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phone_number: string;
}