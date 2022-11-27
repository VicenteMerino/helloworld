import { CreateExperiencesDto } from './create-experiences.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateExperiencesDto extends PartialType(CreateExperiencesDto) {}
