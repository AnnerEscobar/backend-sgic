  import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SgicDataModule } from './sgic-data/sgic-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

  @Module({
    imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.MONGO_URI),
      AuthModule, SgicDataModule,],
    controllers: [],
    providers: [],
  })
  export class AppModule {

    


  }

  
