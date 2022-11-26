import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Put,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { EducationsDto } from './dto/educations.dto';
import { EducationsService } from './educations.service';

@Controller('educations')
export class EducationsController {
  constructor(private educationsService: EducationsService) {}

  @Get()
  async findAll() {
    return await this.educationsService.getEducations();
  }

  @Get(':educationId')
  async findOne(@Param('educationId') educationId: string) {
    return await this.educationsService.getEducation(educationId);
  }

  @Post()
  async create(@Body() educationsDto: EducationsDto) {
    return await this.educationsService.createEducation(educationsDto);
  }

  @Patch(':educationId')
  async update(
    @Param('educationId') educationId: string,
    @Body() educationsDto: EducationsDto,
  ) {
    return await this.educationsService.updateEducation(
      educationId,
      educationsDto,
    );
  }

  @Put(':educationId')
  async replace(
    @Param('educationId') educationId: string,
    @Body() educationsDto: EducationsDto,
    @Res() res,
  ) {
    const result = await this.educationsService.replaceEducation(
      educationId,
      educationsDto,
    );
    const upserted = result.lastErrorObject.updatedExisting;
    if (upserted) {
      return res.status(HttpStatus.OK).send(result.value);
    }
    return res.status(HttpStatus.CREATED).send(result.value);
  }

  @Delete(':educationId')
  async delete(@Res() res, @Param('educationId') educationId: string) {
    const result = await this.educationsService.deleteEducation(educationId);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'Not found' });
    }
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
