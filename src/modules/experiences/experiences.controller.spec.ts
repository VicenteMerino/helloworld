import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';

describe('ExperiencesController', () => {
  let controller: ExperiencesController;

  const experienceFactory = {
    id: Math.random().toString(36).substring(24),
    title: 'title',
    description: 'description',
    location: 'location',
    startDate: new Date(),
    endDate: new Date(),
    company: 'company',
    companyUrl: 'companyUrl',
    companyLogo: 'companyLogo',
  };

  const mockExperiencesService = {
    createExperience: jest.fn((dto) => {
      return {
        ...dto,
        id: Date.now().toString(),
      };
    }),
    getExperience: jest.fn((id) => {
      if (id === experienceFactory.id) {
        return experienceFactory;
      }
      return null;
    }),
    getExperiences: jest.fn(() => {
      return [experienceFactory];
    }),
    updateExperience: jest.fn((id, dto) => {
      if (id === experienceFactory.id) {
        return {
          ...experienceFactory,
          ...dto,
        };
      }
      return null;
    }),
    deleteExperience: jest.fn((id) => {
      if (id === experienceFactory.id) {
        return experienceFactory;
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperiencesController],
      providers: [ExperiencesService],
    })
      .overrideProvider(ExperiencesService)
      .useValue(mockExperiencesService)
      .compile();

    controller = module.get<ExperiencesController>(ExperiencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createExperience', () => {
    it('should create an experience', async () => {
      const dto = {
        title: 'title',
        description: 'description',
        location: 'location',
        startDate: new Date(),
        endDate: new Date(),
        company: 'company',
        companyUrl: 'companyUrl',
        companyLogo: 'companyLogo',
      };
      const result = await controller.create(dto);
      expect(result).toEqual({
        ...dto,
        id: expect.any(String),
      });
      expect(mockExperiencesService.createExperience).toHaveBeenCalledWith(dto);
      expect(mockExperiencesService.createExperience).toHaveBeenCalledTimes(1);
    });
  });

  describe('getExperience', () => {
    it('should get an experience', async () => {
      const result = await controller.findOne(experienceFactory.id);
      expect(result).toEqual(experienceFactory);
      expect(mockExperiencesService.getExperience).toHaveBeenCalledWith(
        experienceFactory.id,
      );
      expect(mockExperiencesService.getExperience).toHaveBeenCalledTimes(1);
    });

    it("should throw not fond exception if experience doesn't exist", async () => {
      await expect(controller.findOne('not-found')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getExperiences', () => {
    it('should get experiences', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([experienceFactory]);
      expect(mockExperiencesService.getExperiences).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateExperience', () => {
    it('should update an experience', async () => {
      const dto = {
        title: 'title',
        description: 'description',
        location: 'location',
        startDate: new Date(),
        endDate: new Date(),
        company: 'company',
        companyUrl: 'companyUrl',
        companyLogo: 'companyLogo',
      };
      const result = await controller.update(experienceFactory.id, dto);
      expect(result).toEqual({
        ...experienceFactory,
        ...dto,
      });
      expect(mockExperiencesService.updateExperience).toHaveBeenCalledWith(
        experienceFactory.id,
        dto,
      );
      expect(mockExperiencesService.updateExperience).toHaveBeenCalledTimes(1);
    });

    it("should throw not fond exception if experience doesn't exist", async () => {
      await expect(controller.update('not-found', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteExperience', () => {
    it('should delete an experience', async () => {
      const result = await controller.delete(experienceFactory.id);
      expect(result).toBeUndefined();
      expect(mockExperiencesService.deleteExperience).toHaveBeenCalledWith(
        experienceFactory.id,
      );
      expect(mockExperiencesService.deleteExperience).toHaveBeenCalledTimes(1);
    });

    it("should throw not fond exception if experience doesn't exist", async () => {
      await expect(controller.delete('not-found')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
