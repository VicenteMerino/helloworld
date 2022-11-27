import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// validate on update
@Schema({ timestamps: true, validateBeforeSave: true })
export class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true, match: /^\d{4}-\d{2}-\d{2}$/ })
  beginDate: Date;

  @Prop({ required: true, match: /^\d{4}-\d{2}-\d{2}$/ })
  endDate: Date;

  @Prop({ required: true })
  description: string;
}

export const EducationsSchema = SchemaFactory.createForClass(Education);
