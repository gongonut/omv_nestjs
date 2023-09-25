/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  city: string;

  @Prop({unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  rol: string[];

  
}

export const UsersSchema = SchemaFactory.createForClass(Users);
