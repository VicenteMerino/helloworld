import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from './schemas/experiences.schema';
import { CreateExperiencesDto } from './dto/create-experiences.dto';
import { UpdateExperiencesDto } from './dto/update-experiences.dto';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectModel('Experience')
    private readonly experiencesModel: Model<Experience>,
  ) {}

  async getExperiences() {
    return await this.experiencesModel.find().exec();
  }

  async getExperience(id: string) {
    return await this.experiencesModel.findById(id).exec();
  }

  async createExperience(experiencesDto: CreateExperiencesDto) {
    const createdExperience = new this.experiencesModel(experiencesDto);
    return await createdExperience.save();
  }

  async updateExperience(id: string, experiencesDto: UpdateExperiencesDto) {
    return await this.experiencesModel.findByIdAndUpdate(id, experiencesDto, {
      new: true,
      runValidators: true,
    });
  }

  async replaceExperience(
    id: string,
    experiencesDto: CreateExperiencesDto | UpdateExperiencesDto,
  ) {
    return await this.experiencesModel.findByIdAndUpdate(id, experiencesDto, {
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });
  }

  async deleteExperience(id: string) {
    return await this.experiencesModel.findByIdAndRemove(id);
  }
}
