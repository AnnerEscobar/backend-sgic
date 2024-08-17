import { Module } from '@nestjs/common';
import { SgicDataService } from './sgic-data.service';
import { SgicDataController } from './sgic-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchemaCaso, SgicCaso, } from './entities/sgic-caso.entity';

@Module({
  controllers: [SgicDataController],
  providers: [SgicDataService],
  imports:[
    MongooseModule.forFeature([{
      name: SgicCaso.name,
      schema: SchemaCaso,
    }])
  ]
})
export class SgicDataModule {}
