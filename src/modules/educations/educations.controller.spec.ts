import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EducationsController } from './educations.controller';
import { EducationsService } from './educations.service';

describe('EducationController', () => {
  let controller: EducationsController;

  const educationFactory = {
    id: Math.random().toString(36).substring(24),
    school: 'school',
    degree: 'degree',
    grade: 1,
    beginDate: new Date(),
    endDate: new Date(),
    description: 'description',
  };

  const mockEducationsService = {
    createEducation: jest.fn((dto) => {
      return {
        ...dto,
        id: Date.now().toString(),
      };
    }),
    getEducation: jest.fn((id) => {
      if (id === educationFactory.id) {
        return educationFactory;
      }
      return null;
    }),
    getEducations: jest.fn(() => {
      return [educationFactory];
    }),
    updateEducation: jest.fn((id, dto) => {
      if (id === educationFactory.id) {
        return {
          ...educationFactory,
          ...dto,
        };
      }
      return null;
    }),
    deleteEducation: jest.fn((id) => {
      if (id === educationFactory.id) {
        return educationFactory;
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationsController],
      providers: [EducationsService],
    })
      .overrideProvider(EducationsService)
      .useValue(mockEducationsService)
      .compile();

    controller = module.get<EducationsController>(EducationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEducation', () => {
    it('should create an education', async () => {
      const dto = {
        school: 'school',
        degree: 'degree',
        grade: 1,
        beginDate: new Date(),
        endDate: new Date(),
        description: 'description',
      };
      const result = await controller.create(dto);
      expect(result).toEqual({
        ...dto,
        id: expect.any(String),
      });
      expect(mockEducationsService.createEducation).toHaveBeenCalledWith(dto);
      expect(mockEducationsService.createEducation).toHaveBeenCalledTimes(1);
    });
  });

  describe('getEducation', () => {
    it('should get an education', async () => {
      const result = await controller.findOne(educationFactory.id);
      expect(result).toEqual(educationFactory);
      expect(mockEducationsService.getEducation).toHaveBeenCalledWith(
        educationFactory.id,
      );
      expect(mockEducationsService.getEducation).toHaveBeenCalledTimes(1);
    });

    it('should return a not found', async () => {
      await expect(controller.findOne('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getEducations', () => {
    it('should get educations', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([educationFactory]);
      expect(mockEducationsService.getEducations).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateEducation', () => {
    it('should update an education', async () => {
      const patchedData = {
        school: 'school2',
        degree: 'degree2',
        grade: 2,
        beginDate: new Date(),
      };
      const result = await controller.update(educationFactory.id, patchedData);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...expectedResponse } = {
        ...educationFactory,
        ...patchedData,
      };

      expect(result).toEqual({
        id: educationFactory.id,
        ...expectedResponse,
      });
      expect(mockEducationsService.updateEducation).toHaveBeenCalledWith(
        educationFactory.id,
        patchedData,
      );
      expect(mockEducationsService.updateEducation).toHaveBeenCalledTimes(1);
    });
    it('should throw a not found exception', async () => {
      await expect(controller.update('123', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteEducation', () => {
    it('should delete an education', async () => {
      const result = await controller.delete(educationFactory.id);
      expect(result).toBeUndefined();
      expect(mockEducationsService.deleteEducation).toHaveBeenCalledWith(
        educationFactory.id,
      );
      expect(mockEducationsService.deleteEducation).toHaveBeenCalledTimes(1);
    });
    it('should throw a not found exception', async () => {
      await expect(controller.delete('123')).rejects.toThrow(NotFoundException);
    });
  });
});
