import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGeneralDto {
    @IsString()
    @IsOptional()
    quote_condition: string;

    @IsNumber()
    @IsOptional()
    p_iva: number;
}
