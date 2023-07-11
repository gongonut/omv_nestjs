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
  client_phone?: string;

  @IsNotEmpty()
  @IsEmail()
  client_email: string;

  @IsOptional()
  agent_city: string;

  @IsOptional()
  agent_name: string;

  @IsOptional()
  agent_phone?: string;

  @IsEmail()
  @IsOptional()
  agent_email: string;

  @IsOptional()
  agent_observations: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  itemList: object[];

  @IsNumber()
  date: number;

  @IsOptional()
  htmlQuote: string;
}
