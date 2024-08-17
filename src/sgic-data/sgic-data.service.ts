import { Injectable } from '@nestjs/common';
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


  create(createSgicCaso: CreateSgicCaso) {
    console.log(createSgicCaso);
    return 'This action adds a new sgicDatum';
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
