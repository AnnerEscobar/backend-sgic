import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SgicDataService } from './sgic-data.service';
import { CreateSgicDatumDto } from './dto/create-sgic-datum.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';

@Controller('sgic-data')
export class SgicDataController {
  constructor(private readonly sgicDataService: SgicDataService) {}

  @Post()
  create(@Body() createSgicDatumDto: CreateSgicDatumDto) {
    return this.sgicDataService.create(createSgicDatumDto);
  }

  @Get()
  findAll() {
    return this.sgicDataService.findAll();
  }

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
  }
}
