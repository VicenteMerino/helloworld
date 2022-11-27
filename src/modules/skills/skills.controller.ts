import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';

import { CreateSkillsDto } from './dto/create-skills.dto';
import { UpdateSkillsDto } from './dto/update-skills.dto';
import { SkillsService } from './skills.service';
import { ISkill } from './skills.interface';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundDto } from '../../generic-dto/not-found.dto';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @ApiOkResponse({
    description: 'Get all skills',
    type: [CreateSkillsDto],
  })
  @Get()
  async findAll(): Promise<ISkill[]> {
    return await this.skillsService.getSkills();
  }

  @ApiOkResponse({
    description: 'Get skill by id',
    type: CreateSkillsDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundDto,
  })
  @Get(':skillId')
  async findOne(@Param('skillId') skillId: string): Promise<ISkill> {
    const result = await this.skillsService.getSkill(skillId);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @ApiCreatedResponse({
    description: 'Create skill',
    type: CreateSkillsDto,
  })
  @Post()
  async create(@Body() skillsDto: CreateSkillsDto): Promise<ISkill> {
    return await this.skillsService.createSkill(skillsDto);
  }

  @ApiOkResponse({
    description: 'Update skill',
    type: CreateSkillsDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundDto,
  })
  @Patch(':skillId')
  async update(
    @Param('skillId') skillId: string,
    @Body() skillsDto: UpdateSkillsDto,
  ): Promise<ISkill> {
    const result = await this.skillsService.updateSkill(skillId, skillsDto);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @ApiNoContentResponse({
    description: 'Delete skill',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundDto,
  })
  @Delete(':skillId')
  async delete(@Param('skillId') skillId: string): Promise<void> {
    const result = await this.skillsService.deleteSkill(skillId);
    if (!result) {
      throw new NotFoundException();
    }
    return;
  }
}
