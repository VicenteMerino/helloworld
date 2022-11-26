import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperiencesController } from './experiences/experiences.controller';
import { EducationsController } from './educations/educations.controller';
import { SkillsController } from './skills/skills.controller';
import { ProjectsController } from './projects/projects.controller';
import { EducationsModule } from './educations/educations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    EducationsModule,
  ],
  controllers: [
    AppController,
    ExperiencesController,
    EducationsController,
    SkillsController,
    ProjectsController,
  ],
  providers: [AppService],
})
export class AppModule {}
