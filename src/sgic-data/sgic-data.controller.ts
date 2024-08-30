import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SgicDataService } from './sgic-data.service';
import { CreateSgicCaso } from './dto/create-sgic-caso.dto';
import { UpdateSgicDatumDto } from './dto/update-sgic-datum.dto';
import { SgicCaso } from './entities/sgic-caso.entity';
import { Response } from 'express';


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
  

  @Get('/download/:deicNumber')
  async downloadFile(@Param('deicNumber') deicNumber: string, @Res() res: Response) {
    console.log(`Solicitud recibida para deicNumber: ${deicNumber}`); // Imprime el parámetro recibido
    try {
      const file = await this.sgicDataService.getFileByDeicNumber(deicNumber);
  
      if (!file) {
        return res.status(404).send('Archivo no encontrado');
      }
  
      const fileName = file.name.endsWith('.pdf') ? file.name : `${file.name}.pdf`;
  
      res.setHeader('Content-Type', file.contentType || 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Length', file.data.length.toString());
  
      res.end(file.data);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      res.status(500).send('Error al descargar el archivo');
    }
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
