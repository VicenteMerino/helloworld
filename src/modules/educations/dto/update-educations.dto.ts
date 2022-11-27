import { CreateEducationsDto } from './create-educations.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateEducationsDto extends PartialType(CreateEducationsDto) {}
