import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterUserDto extends PartialType(LoginUserDto) {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    phone?: string;

    @IsOptional()
    city?: string;

}
