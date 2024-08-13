import { Injectable } from '@nestjs/common';
import { CreateSgicDatumDto } from './dto/create-sgic-datum.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';

@Injectable()
export class SgicDataService {
  create(createSgicDatumDto: CreateSgicDatumDto) {
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
