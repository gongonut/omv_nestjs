/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GeneralDocument = HydratedDocument<General>;

@Schema()
export class General {

  @Prop()
  id: string;

  @Prop()
  quote_condition: string;

  @Prop()
  p_iva: number;

  @Prop()
  consecutive: number;

}

export const GeneralSchema = SchemaFactory.createForClass(General);
