import { IsDateString, IsISBN, IsNumber, IsString, isString, MinLength, minLength } from "class-validator";

export class CreateSgicCaso {

    @IsString()
    caseTipo: string;

    @IsString()
    mpNumber: string;

    @IsString()
    deicNumber: string;

    @IsString()
    alertaNumber: string;

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

}
