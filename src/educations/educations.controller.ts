import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateEducationsDto } from './dto/create-educations.dto';
import { UpdateEducationsDto } from './dto/update-educations.dto';
import { EducationsService } from './educations.service';
import { IEducation } from './educations.interface';
import { Response } from 'express';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('educations')
@Controller('educations')
export class EducationsController {
  constructor(private educationsService: EducationsService) {}

  @ApiOkResponse({
    description: 'Get all educations backgrounds',
    type: [CreateEducationsDto],
  })
  @Get()
  async findAll(): Promise<IEducation[]> {
    return await this.educationsService.getEducations();
  }

  @ApiOkResponse({
    description: 'Get education background by id',
    type: CreateEducationsDto,
  })
  @Get(':educationId')
  async findOne(
    @Param('educationId') educationId: string,
  ): Promise<IEducation> {
    return await this.educationsService.getEducation(educationId);
  }

  @ApiCreatedResponse({
    description: 'Create education background',
    type: CreateEducationsDto,
  })
  @Post()
  async create(
    @Body() educationsDto: CreateEducationsDto,
  ): Promise<IEducation> {
    return await this.educationsService.createEducation(educationsDto);
  }

  @ApiOkResponse({
    description: 'Update education background',
    type: UpdateEducationsDto,
  })
  @Patch(':educationId')
  async update(
    @Param('educationId') educationId: string,
    @Body() educationsDto: UpdateEducationsDto,
  ): Promise<IEducation> {
    return await this.educationsService.updateEducation(
      educationId,
      educationsDto,
    );
  }

  @Delete(':educationId')
  @ApiNoContentResponse({
    description: 'Delete education background',
  })
  async delete(
    @Res() res: Response,
    @Param('educationId') educationId: string,
  ): Promise<Response> {
    const result = await this.educationsService.deleteEducation(educationId);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
