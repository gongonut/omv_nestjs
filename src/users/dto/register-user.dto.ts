import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto extends PartialType(LoginUserDto) {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;
}
