import { Test, TestingModule } from '@nestjs/testing';
import { EducationsService } from './educations.service';
import { getModelToken } from '@nestjs/mongoose';

describe('EducationsService', () => {
  let service: EducationsService;

  const educationFactory = {
    school: 'school',
    degree: 'degree',
    fieldOfStudy: 'fieldOfStudy',
    beginDate: '2020-01-01',
    endDate: '2021-01-01',
    description: 'description',
    grade: 'grade',
  };

  const mockExperiencesModel = {
    find: jest.fn().mockReturnValue([educationFactory]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EducationsService,
        {
          provide: getModelToken('Education'),
          useValue: mockExperiencesModel,
        },
      ],
    }).compile();
    service = module.get<EducationsService>(EducationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of educations', async () => {
      const result = await service.getEducations();
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual([educationFactory]);
      expect(mockExperiencesModel.find).toHaveBeenCalled();
    });
  });
});
