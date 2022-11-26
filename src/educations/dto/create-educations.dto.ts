import { IsNotEmpty, Matches } from 'class-validator';

export class CreateEducationsDto {
  // @IsNotEmpty({ message: 'Please enter a school name' })
  school: string;
  @IsNotEmpty({ message: 'Please enter a degree' })
  degree: string;
  @IsNotEmpty({ message: 'Please enter a field of study' })
  fieldOfStudy: string;
  @IsNotEmpty({ message: 'Please enter a start date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date in format YYYY-MM-DD',
  })
  from: string;
  @IsNotEmpty({ message: 'Please enter an end date' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date in format YYYY-MM-DD',
  })
  to: string;
  @IsNotEmpty({ message: 'Please enter a description' })
  description: string;
}
