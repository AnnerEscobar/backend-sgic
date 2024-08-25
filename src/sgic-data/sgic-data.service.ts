import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSgicCaso } from './dto/create-sgic-caso.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SgicCaso } from './entities/sgic-caso.entity';
import { Model } from 'mongoose';
import { CaseTipo } from './dto/case-tipo.enum';

@Injectable()
export class SgicDataService {

  constructor(
    @InjectModel(SgicCaso.name)
    private casosModel: Model<SgicCaso>,
  ) { }


  async create(createSgicCaso: CreateSgicCaso): Promise<SgicCaso> {
    try {
      const newCaso = new this.casosModel(createSgicCaso);
      return await newCaso.save();
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = this.extractDuplicateField(error.message);
        throw new BadRequestException(`Error: El caso con el/los campo(s) ${duplicateField} ya existe(n).`);
      }
      throw new InternalServerErrorException('Error al crear el caso: ' + error.message);
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

  findOne(id: number) {
    return `This action returns a #${id} sgicDatum`;
  }

  update(id: number, updateSgicDatumDto: UpdateSgicDatumDto) {
    return `This action updates a #${id} sgicDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} sgicDatum`;
  }
}
