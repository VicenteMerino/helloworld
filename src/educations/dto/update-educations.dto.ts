import { Matches } from 'class-validator';

export class UpdateEducationsDto {
  school: string;
  degree: string;
  fieldOfStudy: string;
  // add regex in format YYYY-MM-DD
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date in format YYYY-MM-DD',
  })
  from: string;
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Please enter a valid date in format YYYY-MM-DD',
  })
  to: string;
  description: string;
}
