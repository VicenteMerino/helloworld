import { Document } from 'mongoose';

export interface ISkill extends Document {
  readonly name: string;
  readonly imageUrl: string;
}
