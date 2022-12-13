import { Test, TestingModule } from '@nestjs/testing';
import { SkillsService } from './skills.service';
import { getModelToken } from '@nestjs/mongoose';

describe('SkillsService', () => {
  let service: SkillsService;

  const mockSkillsRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        { provide: getModelToken('Skill'), useValue: mockSkillsRepository },
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
