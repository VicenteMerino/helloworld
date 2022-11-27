import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateEducationsDto {
  @ApiProperty({
    required: true,
    example: 'University of California',
    description: 'School name',
  })
  @IsNotEmpty({ message: 'Please enter a school name' })
  school: string;
  @ApiProperty({
    required: true,
    example: 'Computer Science',
    description: 'Degree',
  })
  @IsNotEmpty({ message: 'Please enter a degree' })
  degree: string;
  @ApiProperty({
    required: true,
    example: 6.9,
    description: 'Grade',
  })
  @IsNotEmpty({ message: 'Please enter a grade' })
  grade: number;
  @ApiProperty({
    required: true,
    example: '2019-01-01',
    description: 'Beginning date',
    format: 'date',
  })
  @IsNotEmpty({ message: 'Please enter a start date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date in format YYYY-MM-DD',
  })
  beginData: Date;
  @ApiProperty({
    required: true,
    example: '2020-01-01',
    description: 'Ending date',
    format: 'date',
  })
  @IsNotEmpty({ message: 'Please enter an end date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date in format YYYY-MM-DD',
  })
  endDate: Date;
  @ApiProperty({
    required: true,
    example: 'I learned a lot',
    description: 'Description',
  })
  @IsNotEmpty({ message: 'Please enter a description' })
  description: string;
}
