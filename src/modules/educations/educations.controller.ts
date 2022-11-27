import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CreateEducationsDto } from './dto/create-educations.dto';
import { UpdateEducationsDto } from './dto/update-educations.dto';
import { EducationsService } from './educations.service';
import { IEducation } from './educations.interface';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundDto } from '../../generic-dto/not-found.dto';

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
  @ApiNotFoundResponse({
    description: 'Education background not found',
    type: NotFoundDto,
  })
  @Get(':educationId')
  async findOne(
    @Param('educationId') educationId: string,
  ): Promise<IEducation> {
    const result = await this.educationsService.getEducation(educationId);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
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
  @ApiNotFoundResponse({
    description: 'Education background not found',
    type: NotFoundDto,
  })
  @Patch(':educationId')
  async update(
    @Param('educationId') educationId: string,
    @Body() educationsDto: UpdateEducationsDto,
  ): Promise<IEducation> {
    const result = await this.educationsService.updateEducation(
      educationId,
      educationsDto,
    );
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Delete(':educationId')
  @ApiNoContentResponse({
    description: 'Delete education background',
  })
  @ApiNotFoundResponse({
    description: 'Education background not found',
    type: NotFoundDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('educationId') educationId: string): Promise<void> {
    const result = await this.educationsService.deleteEducation(educationId);
    if (!result) {
      throw new NotFoundException();
    }
    return;
  }
}
