/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema()
export class Quote {

  @Prop()
  clientName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
  
  @Prop()
  observations: string;

  @Prop()
  status: number;

  @Prop()
  itemList: object[];

  @Prop()
  date: number;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
