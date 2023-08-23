import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CreateEmailDto {

    @IsNotEmpty()
    @IsEmail()
    to: string;

    @IsNotEmpty()
    @IsEmail()
    from: string;

    @IsOptional()
    subject: string;

    @IsOptional()
    html: string;

    @IsOptional()
    attachments?: string[];
}
