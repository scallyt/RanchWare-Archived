import { IsEmail, IsNotEmpty, IsString, } from 'class-validator';
  

export class SignInDto  {
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
