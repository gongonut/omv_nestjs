/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatalogDocument = HydratedDocument<Catalog>;

@Schema()
export class Catalog {

    @Prop()
    familia: string;

    @Prop()
    descripcion_comercial: string;

    @Prop()
    descripcion_larga?: string;

    @Prop({type: 'object'})
    imagen: object;

    @Prop()
    existencia?: number;

    @Prop()
    precio?: number;

    @Prop({type: 'object'})
    subcategoria_1: object;

    @Prop()
    materiales?: object[];

    @Prop()
    material?: string;

    @Prop()
    medidas_omv?: string;

    @Prop()
    area_impresion?: string;

    @Prop()
    tecnica_marca_descripcion?: string;
 
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
