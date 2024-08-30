import { CaseTipo } from './case-tipo.enum';
import {ArrayMinSize, IsArray, IsOptional, IsString, isString, MinLength, minLength, ValidateIf } from "class-validator";


export class CreateSgicCaso {

    @IsString()
    caseTipo: string;

    @IsString()
    mpNumber: string;

    @IsString()
    deicNumber: string;

    @ValidateIf(o => o.CaseTipo === CaseTipo.ALERTA)
    @IsString()
    alertaNumber?: string | '';

    @IsString()
    Name: string;

    @IsString()
    Age: string;

    @IsString()
    Lugar: string;

    @IsString()
    Gps: string;

    @IsString()
    investigadorName: string;

    @IsString()
    investigacionStatus: string;

    @IsString()
    userId:string;

    @IsArray()
    @ArrayMinSize(1,{message: 'Debes subir almenos un archivo'})
    files: string[];

}
