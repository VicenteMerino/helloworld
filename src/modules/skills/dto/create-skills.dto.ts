import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateSkillsDto {
  @ApiProperty({
    required: true,
    example: 'JavaScript',
    description: 'Skill name',
  })
  @IsNotEmpty({ message: 'Please enter a skill name' })
  name: string;
  @ApiProperty({
    required: true,
    example: 'https://cdn.svgporn.com/logos/javascript.svg',
    description: 'Image URL',
  })
  @IsNotEmpty({ message: 'Please enter an image URL' })
  imageUrl: string;
}
