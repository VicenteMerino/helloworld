import { CreateSkillsDto } from './create-skills.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSkillsDto extends PartialType(CreateSkillsDto) {}
