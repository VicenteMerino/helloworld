import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, validateBeforeSave: true })
export class Experience {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  companyUrl: string;

  @Prop({ required: true })
  companyLogo: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
