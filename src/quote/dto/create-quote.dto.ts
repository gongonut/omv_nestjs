import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEmail } from 'class-validator';

export class CreateQuoteDto {
  @IsNotEmpty()
  @IsString()
  client_name: string;

  @IsOptional()
  consecutive?: string;

  @IsOptional()
  client_contact: string;

  @IsOptional()
  client_phone: string;

  @IsNotEmpty()
  @IsEmail()
  client_email: string;

  @IsOptional()
  agent_city: string;

  @IsOptional()
  agent_id: string;

  @IsOptional()
  agent_name: string;

  @IsOptional()
  agent_phone?: string;

  @IsOptional()
  agent_email: string;

  @IsOptional()
  agent_observations: string;

  @IsNotEmpty()
  itemList: object[];

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsNumber()
  date: number;

  @IsOptional()
  htmlQuote: string;

  @IsOptional()
  p_iva: number;

  @IsOptional()
  error: string;

  @IsOptional()
  condList: string[];

  @IsOptional()
  hideTotal: boolean;

  @IsOptional()
  crome_image: string;

  @IsOptional()
  total: number;

}
