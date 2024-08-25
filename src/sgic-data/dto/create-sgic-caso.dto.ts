import { CaseTipo } from './case-tipo.enum';
import {IsOptional, IsString, isString, MinLength, minLength, ValidateIf } from "class-validator";


export class CreateSgicCaso {

    @IsString()
    caseTipo: string;

    @IsString()
    mpNumber: string;

    @IsString()
    deicNumber: string;

    @ValidateIf(o => o.CaseTipo === CaseTipo.ALERTA)
    @IsString()
    alertaNumber?: string;

    @IsString()
    desaparecidoName: string;

    @IsString()
    desaparecidoAge: string;

    @IsString()
    desaparecidoLugar: string;

    @IsString()
    desaparecidoGps: string;

    @IsString()
    investigadorName: string;

    @IsString()
    investigacionStatus: string;

    @IsString()
    userId:string;


}
