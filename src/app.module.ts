import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationsController } from './educations/educations.controller';
import { EducationsModule } from './educations/educations.module';
import { ExperiencesController } from './experiences/experiences.controller';
import { ExperiencesModule } from './experiences/experiences.module';
import { SkillsController } from './skills/skills.controller';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EducationsModule,
    ExperiencesModule,
    SkillsModule,
  ],
  controllers: [
    AppController,
    EducationsController,
    ExperiencesController,
    SkillsController,
  ],
  providers: [AppService],
})
export class AppModule {}
