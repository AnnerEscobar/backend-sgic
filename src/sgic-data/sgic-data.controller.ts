import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SgicDataService } from './sgic-data.service';
import { CreateSgicCaso } from './dto/create-sgic-caso.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';
import { SgicCaso } from './entities/sgic-caso.entity';

@Controller('sgic-data')
export class SgicDataController {
  constructor(private readonly sgicDataService: SgicDataService) {}

  @Post('/create')
  create(@Body() createSgicCasoDto: CreateSgicCaso) {
    console.log(createSgicCasoDto);
    return this.sgicDataService.create(createSgicCasoDto);
  }

  @Get('user/:userId')
  async getCasesByUser(@Param('userId') userId: string):Promise<SgicCaso[]> {
    return this.sgicDataService.findByUser(userId);
  }

  @Get('/count-by-type')
  async countCasesByTipe(){
    return await this.sgicDataService.conuntCasesByType();
  }



/* 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sgicDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSgicDatumDto: UpdateSgicDatumDto) {
    return this.sgicDataService.update(+id, updateSgicDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sgicDataService.remove(+id);
  } */
}
