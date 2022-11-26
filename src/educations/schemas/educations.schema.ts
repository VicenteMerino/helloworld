import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Education {
  @Prop()
  school: string;

  @Prop()
  degree: string;

  @Prop()
  fieldofstudy: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  description: string;
}

export const EducationsSchema = SchemaFactory.createForClass(Education);
