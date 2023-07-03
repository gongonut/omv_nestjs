import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsString()
  clientName: string;

  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  observations: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  itemList: object[];

  @IsNumber()
  date: number;
}
