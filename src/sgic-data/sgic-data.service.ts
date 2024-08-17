import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSgicCaso } from './dto/create-sgic-caso.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SgicCaso } from './entities/sgic-caso.entity';
import { Model } from 'mongoose';

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
        throw new BadRequestException(`${createSgicCaso.deicNumber} alredy exists !!!`)
      }
      throw new InternalServerErrorException('Something bad happened !!!')
    }
  }



  findAll() {
    return `This action returns all sgicData`;
  }

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
