import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationsController } from './educations.controller';
import { EducationsService } from './educations.service';
import { EducationsSchema } from './schemas/educations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Education', schema: EducationsSchema },
    ]),
  ],
  controllers: [EducationsController],
  providers: [EducationsService],
  exports: [EducationsService],
})
export class EducationsModule {}
