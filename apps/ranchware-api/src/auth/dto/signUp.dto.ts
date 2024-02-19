import { IsEmail, IsNotEmpty, IsString, } from 'class-validator';
  

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string
}
