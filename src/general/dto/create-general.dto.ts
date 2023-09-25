import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGeneralDto {
    @IsString()
    @IsOptional()
    quote_condition: string;

    @IsNumber()
    @IsOptional()
    p_iva: number;

    @IsNumber()
    @IsOptional()
    consecutive: number;

    @IsOptional()
    name: string;

    @IsOptional()
    site: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

}
