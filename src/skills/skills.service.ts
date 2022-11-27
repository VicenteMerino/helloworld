import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './schemas/skills.schema';
import { CreateSkillsDto } from './dto/create-skills.dto';
import { UpdateSkillsDto } from './dto/update-skills.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel('Skill')
    private readonly skillsModel: Model<Skill>,
  ) {}

  async getSkills() {
    return await this.skillsModel.find().exec();
  }

  async getSkill(id: string) {
    return await this.skillsModel.findById(id).exec();
  }

  async createSkill(skillsDto: CreateSkillsDto) {
    const createdSkill = new this.skillsModel(skillsDto);
    return await createdSkill.save();
  }

  async updateSkill(id: string, skillsDto: UpdateSkillsDto) {
    return await this.skillsModel.findByIdAndUpdate(id, skillsDto, {
      new: true,
      runValidators: true,
    });
  }

  async replaceSkill(id: string, skillsDto: CreateSkillsDto | UpdateSkillsDto) {
    return await this.skillsModel.findByIdAndUpdate(id, skillsDto, {
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });
  }

  async deleteSkill(id: string) {
    return await this.skillsModel.findByIdAndRemove(id);
  }
}
