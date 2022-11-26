import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationsController } from './educations/educations.controller';
import { EducationsModule } from './educations/educations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EducationsModule,
  ],
  controllers: [AppController, EducationsController],
  providers: [AppService],
})
export class AppModule {}
