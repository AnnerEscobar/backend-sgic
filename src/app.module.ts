  import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SgicDataModule } from './sgic-data/sgic-data.module';

  @Module({
    imports: [AuthModule, SgicDataModule],
    controllers: [],
    providers: [],
  })
  export class AppModule {}

  
