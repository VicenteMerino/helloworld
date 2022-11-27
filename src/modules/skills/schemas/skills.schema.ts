import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, validateBeforeSave: true })
export class Skill {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
