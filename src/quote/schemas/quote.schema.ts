/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema()
export class Quote {

  @Prop()
  consecutive?: string;

  @Prop({required: true})
  client_name: string;

  @Prop()
  client_contact: string;

  @Prop()
  client_phone: string;

  @Prop({required: true})
  client_email: string;
  
  @Prop()
  client_observations: string;

  @Prop()
  agent_id?: string;

  @Prop()
  agent_name?: string;

  @Prop()
  agent_city?: string;

  @Prop()
  agent_phone?: string;

  @Prop()
  agent_email?: string;

  @Prop([Object])
  itemList: object[];

  @Prop()
  status: number;

  @Prop()
  date: number;
  
  @Prop()
  htmlQuote: string;

  @Prop()
  p_iva: number;

  @Prop()
  error: string;

  @Prop()
  condList: string[];

  @Prop()
  hideTotal: boolean;

  @Prop()
  crome_image: string;

  @Prop()
  total: number;

}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
