  import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SgicDataModule } from './sgic-data/sgic-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';

  @Module({
    imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.MONGO_URI,{
        dbName: process.env.MONGO_DB_NAME,
      }),
      MulterModule.register({
        dest: './uploads',
      }),
      
      AuthModule, SgicDataModule,],
    controllers: [],
    providers: [],
  })
  export class AppModule {

    


  }

  
