import { Document } from 'mongoose';

export interface IEducation extends Document {
  readonly id?: string;
  readonly school: string;
  readonly degree: string;
  readonly grade: number;
  readonly beginDate: Date;
  readonly endDate: Date;
  readonly description: string;
}
