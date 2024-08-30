import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class SgicCaso extends Document {

  @Prop({ required: true })
  caseTipo: string;

  @Prop({ unique: true, required: true })
  mpNumber: string;

  @Prop({ required: true, unique: true })
  deicNumber: string;

  @Prop({ sparse: true })  // sparse permite valores null sin violar la restricción de unicidad
  alertaNumber?: string | '';

  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Age: string;

  @Prop({ required: true })
  Lugar: string;

  @Prop({ required: true })
  Gps: string;

  @Prop({ required: true })
  investigadorName: string;

  @Prop({ required: true })
  investigacionStatus: string;

  @Prop({ required: true })
  userId: string;

  @Prop({required: true})
  files: string[];

}

export const SchemaCaso = SchemaFactory.createForClass(SgicCaso);
SchemaCaso.index(
  { deicNumber: 1, mpNumber: 1 },
  { unique: true }
);

// Validación condicional de alertaNumber
SchemaCaso.path('alertaNumber').validate(function (value) {
  if (this.caseTipo === 'Alerta') {
    return value != null && value.trim() !== '';
  }
  return true;
}, 'El campo alertaNumber es requerido para casos de Alerta Alba-Keneth');