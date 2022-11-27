import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreateExperiencesDto } from './dto/create-experiences.dto';
import { UpdateExperiencesDto } from './dto/update-experiences.dto';
import { ExperiencesService } from './experiences.service';
import { IExperience } from './experiences.interface';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { NotFoundDto } from 'src/generic-dto/not-found.dto';

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
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundDto,
  })
  @Get(':experienceId')
  async findOne(
    @Param('experienceId') experienceId: string,
    @Res() response: Response,
  ): Promise<Response> {
    const result = await this.experiencesService.getExperience(experienceId);
    if (result) {
      return response.status(HttpStatus.OK).send(result);
    }
    return response.status(HttpStatus.NOT_FOUND).send({ message: 'Not found' });
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
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundDto,
  })
  @Delete(':experienceId')
  async delete(
    @Param('experienceId') experienceId: string,
    @Res() response: Response,
  ): Promise<Response> {
    const result = await this.experiencesService.deleteExperience(experienceId);
    if (result) {
      return response.status(HttpStatus.NO_CONTENT).send();
    }
    return response.status(HttpStatus.NOT_FOUND).send({ message: 'Not found' });
  }
}
