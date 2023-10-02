import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    rol?: string[];

}
