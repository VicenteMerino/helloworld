import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

// validate on update
@Schema({ timestamps: true, validateBeforeSave: true })
export class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  fieldOfStudy: string;

  // add regex in format YYYY-MM-DD
  @Prop({ required: true, match: /^\d{4}-\d{2}-\d{2}$/ })
  from: string;

  @Prop({ required: true, match: /^\d{4}-\d{2}-\d{2}$/ })
  to: string;

  @Prop({ required: true })
  description: string;
}

export const EducationsSchema = SchemaFactory.createForClass(Education);
