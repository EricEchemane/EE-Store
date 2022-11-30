import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpSellerDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    store_name: string;

    @IsNotEmpty()
    @IsString()
    store_description: string;
}