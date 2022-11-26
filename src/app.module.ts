import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExperiencesController } from './experiences/experiences.controller';
import { EducationController } from './education/education.controller';
import { SkillsController } from './skills/skills.controller';
import { ProjectsController } from './projects/projects.controller';

@Module({
  imports: [],
  controllers: [AppController, ExperiencesController, EducationController, SkillsController, ProjectsController],
  providers: [AppService],
})
export class AppModule {}
