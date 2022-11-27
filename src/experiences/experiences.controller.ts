import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateExperiencesDto } from './dto/create-experiences.dto';
import { UpdateExperiencesDto } from './dto/update-experiences.dto';
import { ExperiencesService } from './experiences.service';
import { IExperience } from './experiences.interface';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController {
  constructor(private experiencesService: ExperiencesService) {}

  @ApiOkResponse({
    description: 'Get all experiences',
    type: [CreateExperiencesDto],
  })
  @Get()
  async findAll(): Promise<IExperience[]> {
    return await this.experiencesService.getExperiences();
  }

  @ApiOkResponse({
    description: 'Get experience by id',
    type: CreateExperiencesDto,
  })
  @Get(':experienceId')
  async findOne(
    @Param('experienceId') experienceId: string,
  ): Promise<IExperience> {
    return await this.experiencesService.getExperience(experienceId);
  }

  @ApiCreatedResponse({
    description: 'Create experience',
    type: CreateExperiencesDto,
  })
  @Post()
  async create(
    @Body() experiencesDto: CreateExperiencesDto,
  ): Promise<IExperience> {
    return await this.experiencesService.createExperience(experiencesDto);
  }

  @ApiOkResponse({
    description: 'Update experience',
    type: CreateExperiencesDto,
  })
  @Patch(':experienceId')
  async update(
    @Param('experienceId') experienceId: string,
    @Body() experiencesDto: UpdateExperiencesDto,
  ): Promise<IExperience> {
    return await this.experiencesService.updateExperience(
      experienceId,
      experiencesDto,
    );
  }

  @ApiNoContentResponse({ description: 'Delete experience' })
  @Delete(':experienceId')
  async delete(
    @Param('experienceId') experienceId: string,
  ): Promise<IExperience> {
    return await this.experiencesService.deleteExperience(experienceId);
  }
}
