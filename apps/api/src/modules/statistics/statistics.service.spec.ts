import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { PrismaService } from '../../database/prisma.service';

describe('StatisticsService Unit Tests', () => {
  let service: StatisticsService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getScoreStatistics', () => {
    it('should map SQL result correctly into SubjectStatisticsDto[]', async () => {
      const mockDbRow = {
        math_excellent: 152031,
        math_good: 341252,
        math_average: 442112,
        math_poor: 126210,
        literature_excellent: 890,
        literature_good: 4100,
        literature_average: 3100,
        literature_poor: 210,
      };
      prisma.$queryRaw.mockResolvedValue([mockDbRow]);

      const result = await service.getScoreStatistics();

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(9);

      const mathResult = result.find((item) => item.subject === 'math');
      expect(mathResult).toEqual({
        subject: 'math',
        subjectName: 'Math',
        excellent: 152031,
        good: 341252,
        average: 442112,
        poor: 126210,
      });

      const literatureResult = result.find((item) => item.subject === 'literature');
      expect(literatureResult).toEqual({
        subject: 'literature',
        subjectName: 'Literature',
        excellent: 890,
        good: 4100,
        average: 3100,
        poor: 210,
      });
    });

    it('should return an empty array when SQL query returns empty result', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      const result = await service.getScoreStatistics();

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should handle database exceptions properly by throwing InternalServerErrorException', async () => {
      const dbError = new Error('Database connection failed');
      prisma.$queryRaw.mockRejectedValue(dbError);

      await expect(service.getScoreStatistics()).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(service.getScoreStatistics()).rejects.toThrow(
        'Failed to retrieve score statistics: Database connection failed',
      );
    });
  });
});
