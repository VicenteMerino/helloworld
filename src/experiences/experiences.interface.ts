import { Document } from 'mongoose';

export interface IExperience extends Document {
  readonly title: string;
  readonly description: string;
  readonly location: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly company: string;
  readonly companyUrl: string;
  readonly companyLogo: string;
}
