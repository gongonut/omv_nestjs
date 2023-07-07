/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema()
export class Quote {

  @Prop()
  client_name: string;

  @Prop()
  client_contact: string;

  @Prop()
  client_phone: string;

  @Prop()
  client_email: string;
  
  @Prop()
  client_observations: string;

  @Prop()
  agent_name: string;

  @Prop()
  agent_phone: string;

  @Prop()
  agent_email: string;
  
  @Prop()
  agent_observations: string;

  @Prop()
  status: number;

  @Prop()
  itemList: object[];

  @Prop()
  date: number;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
