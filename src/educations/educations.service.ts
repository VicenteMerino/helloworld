import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from './schemas/educations.schema';
import { CreateEducationsDto } from './dto/create-educations.dto';
import { UpdateEducationsDto } from './dto/update-educations.dto';

@Injectable()
export class EducationsService {
  constructor(
    @InjectModel('Education')
    private readonly educationsModel: Model<Education>,
  ) {}

  async getEducations() {
    return await this.educationsModel.find().exec();
  }

  async getEducation(id: string) {
    return await this.educationsModel.findById(id).exec();
  }

  async createEducation(educationsDto: CreateEducationsDto) {
    const createdEducation = new this.educationsModel(educationsDto);
    return await createdEducation.save();
  }

  async updateEducation(id: string, educationsDto: UpdateEducationsDto) {
    return await this.educationsModel.findByIdAndUpdate(id, educationsDto, {
      new: true,
      runValidators: true,
    });
  }

  async replaceEducation(id: string, educationsDto: CreateEducationsDto) {
    return await this.educationsModel.findByIdAndUpdate(id, educationsDto, {
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });
  }

  async deleteEducation(id: string) {
    return await this.educationsModel.findByIdAndRemove(id);
  }
}
