import { Module } from '@nestjs/common';
import { SgicDataService } from './sgic-data.service';
import { SgicDataController } from './sgic-data.controller';

@Module({
  controllers: [SgicDataController],
  providers: [SgicDataService],
})
export class SgicDataModule {}
