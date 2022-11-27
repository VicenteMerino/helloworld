import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateExperiencesDto {
  @ApiProperty({
    required: true,
    example: 'Software Engineer',
    description: 'Title',
  })
  @IsNotEmpty({ message: 'Please enter a title' })
  title: string;
  @ApiProperty({
    required: true,
    example: 'I did a lot of stuff',
    description: 'Description',
  })
  @IsNotEmpty({ message: 'Please enter a description' })
  description: string;
  @ApiProperty({
    required: true,
    example: 'San Francisco, CA',
    description: 'Location',
  })
  @IsNotEmpty({ message: 'Please enter a location' })
  location: string;
  @ApiProperty({
    required: true,
    example: '2019-01-01',
    description: 'Beginning date',
    format: 'date',
  })
  @IsNotEmpty({ message: 'Please enter a start date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Please enter a valid date' })
  startDate: Date;
  @ApiProperty({
    required: true,
    example: '2020-01-01',
    description: 'Ending date',
    format: 'date',
  })
  @IsNotEmpty({ message: 'Please enter an end date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Please enter a valid date' })
  endDate: Date;
  @ApiProperty({
    required: true,
    example: 'Google',
    description: 'Company',
  })
  @IsNotEmpty({ message: 'Please enter a company' })
  company: string;
  @ApiProperty({
    required: true,
    example: 'https://google.com',
    description: 'Company URL',
  })
  @IsNotEmpty({ message: 'Please enter a company URL' })
  companyUrl: string;
  @ApiProperty({
    required: true,
    example: 'https://google.com/logo.png',
    description: 'Company logo',
  })
  @IsNotEmpty({ message: 'Please enter a company logo' })
  companyLogo: string;
}
