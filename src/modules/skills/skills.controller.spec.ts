import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

describe('SkillsController', () => {
  let controller: SkillsController;

  const skillFactory = {
    id: Math.random().toString(36).substring(24),
    name: 'name',
    imageUrl: 'imageUrl',
  };

  const mockSkillsService = {
    createSkill: jest.fn((dto) => {
      return {
        ...dto,
        id: Date.now().toString(),
      };
    }),
    getSkill: jest.fn((id) => {
      if (id === skillFactory.id) {
        return skillFactory;
      }
      return null;
    }),
    getSkills: jest.fn(() => {
      return [skillFactory];
    }),
    updateSkill: jest.fn((id, dto) => {
      if (id === skillFactory.id) {
        return {
          ...skillFactory,
          ...dto,
        };
      }
      return null;
    }),
    deleteSkill: jest.fn((id) => {
      if (id === skillFactory.id) {
        return skillFactory;
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      providers: [SkillsService],
    })
      .overrideProvider(SkillsService)
      .useValue(mockSkillsService)
      .compile();

    controller = module.get<SkillsController>(SkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSkill', () => {
    it('should return a skill', async () => {
      const skill = await controller.create(skillFactory);
      expect(skill).toEqual({
        ...skillFactory,
        id: expect.any(String),
      });
      expect(mockSkillsService.createSkill).toBeCalledWith(skillFactory);
      expect(mockSkillsService.createSkill).toBeCalledTimes(1);
    });
  });

  describe('getSkill', () => {
    it('should return a skill', async () => {
      const skill = await controller.findOne(skillFactory.id);
      expect(skill).toEqual(skillFactory);
      expect(mockSkillsService.getSkill).toBeCalledWith(skillFactory.id);
      expect(mockSkillsService.getSkill).toBeCalledTimes(1);
    });

    it("should throw not found exception if skill doesn't exist", async () => {
      await expect(controller.findOne('not-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getSkills', () => {
    it('should return a list of skills', async () => {
      const skills = await controller.findAll();
      expect(skills).toEqual([skillFactory]);
      expect(mockSkillsService.getSkills).toBeCalledTimes(1);
    });
  });

  describe('updateSkill', () => {
    it('should return a skill', async () => {
      const dto = {
        name: 'new name',
        imageUrl: 'new imageUrl',
      };
      const skill = await controller.update(skillFactory.id, dto);
      expect(skill).toEqual({
        ...skillFactory,
        ...dto,
      });
      expect(mockSkillsService.updateSkill).toBeCalledWith(
        skillFactory.id,
        dto,
      );
      expect(mockSkillsService.updateSkill).toBeCalledTimes(1);
    });

    it("should throw not found exception if skill doesn't exist", async () => {
      await expect(controller.update('not-existing-id', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteSkill', () => {
    it('should delete a skill', async () => {
      const skill = await controller.delete(skillFactory.id);
      expect(skill).toBeUndefined();
      expect(mockSkillsService.deleteSkill).toBeCalledWith(skillFactory.id);
      expect(mockSkillsService.deleteSkill).toBeCalledTimes(1);
    });

    it("should throw not found exception if skill doesn't exist", async () => {
      await expect(controller.delete('not-existing-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
