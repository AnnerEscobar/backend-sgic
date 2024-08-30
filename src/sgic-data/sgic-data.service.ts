import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateSgicCaso } from './dto/create-sgic-caso.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SgicCaso } from './entities/sgic-caso.entity';
import { Model } from 'mongoose';
import { FileModel } from './dto/files.interface';

@Injectable()
export class SgicDataService {

  constructor(
    @InjectModel(SgicCaso.name)
    private casosModel: Model<SgicCaso>,
    
  ) { }

  private readonly logger = new Logger(SgicDataService.name);

  async create(createSgicCaso: CreateSgicCaso): Promise<SgicCaso> {
    try {
      const newCaso = new this.casosModel(createSgicCaso);
      return await newCaso.save();
    } catch (error) {

      Logger.error('Error al crear el caso', error.stack, 'CreateCAsoSGis')

      if (error.code === 11000) {
        const duplicateField = this.extractDuplicateField(error.message);
        throw new BadRequestException(`Error: El caso con el/los campo(s) ${duplicateField} ya existe(n).`);
      }
      throw new InternalServerErrorException(`Error al crear el caso: '${error.message}`, error.stack);
    }
  }



  private extractDuplicateField(message: string): string {
    const match = message.match(/index: (.+)_1 dup key: { : "(.*)" }/);
    return match ? match[1] : 'desconocido';
  }



  async findByUser(userId: string): Promise<SgicCaso[]> {
    try {
      return await this.casosModel.find({ userId }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Algo salio mal con la busqueda')
    }
  }

  async conuntCasesByType(): Promise<any> {
    try {
      const result = await this.casosModel.aggregate([
        {
          $group: {
            _id: '$caseTipo',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            CaseTipo: '$_id',
            count: 1,
          },
        },
      ]);
      
      console.log(result)
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error al contar los casos por tipo:' + error)
    }
  }

  async getFileByDeicNumber(deicNumber: string): Promise<FileModel> {
    console.log(`Buscando archivo para deicNumber: ${deicNumber}`);
    const caso = await this.casosModel.findOne({ deicNumber });
  
    console.log(`Caso encontrado: ${JSON.stringify(caso)}`);
  
    if (!caso || !caso.files || caso.files.length === 0) {
      throw new NotFoundException('Caso o archivo no encontrado');
    }
  
    const fileData = caso.files[0]; // Asumimos que es una cadena base64
  
    // Eliminar el prefijo data URI si está presente
    const base64Data = fileData.replace(/^data:application\/pdf;base64,/, '');
    
    // Convertir a Buffer
    const fileBuffer = Buffer.from(base64Data, 'base64');
  
    const fileName = caso.deicNumber || 'archivo.pdf'; // Obtener nombre original si está disponible
  
    return {
      data: fileBuffer,
      name: fileName,
      contentType: 'application/pdf' // Ajustar según el tipo de archivo
    };
  }
  
}



  /*   async create(createSgicCaso: CreateSgicCaso): Promise<SgicCaso> {
      try {
        const newCaso = new this.casosModel(createSgicCaso);
        return await newCaso.save();
      } catch (error) {
        if (error.code === 11000) {
          throw new BadRequestException(`Error, datos de los casos ya existen`, error.message)
        }
        throw new InternalServerErrorException('Error al crear el caso')
      }
    }
     */

/*   findOne(id: number) {
    return `This action returns a #${id} sgicDatum`;
  }

  update(id: number, updateSgicDatumDto: UpdateSgicDatumDto) {
    return `This action updates a #${id} sgicDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} sgicDatum`;
  } */

