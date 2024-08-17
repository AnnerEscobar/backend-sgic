import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class SgicCaso {

    @Prop({required: true})
    caseTipo: string;

    @Prop({unique: true, required: true})
    mpNumber: string;

    @Prop({unique:true, required:true})
    deicNumber: string;

    @Prop({unique:true, required:true})
    alertaNumber: string;

    @Prop({required:true})
    desaparecidoName: string;

    @Prop({required:true})
    desaparecidoAge: number;

    @Prop({required:true})
    desaparecidoLugar: string;

    @Prop({required:true})
    desaparecidoGps: string;

    @Prop({required:true})
    investigadorName: string;

    @Prop({required:true})
    investigacionStatus: string;

}

export const SchemaCaso = SchemaFactory.createForClass(SgicCaso);
