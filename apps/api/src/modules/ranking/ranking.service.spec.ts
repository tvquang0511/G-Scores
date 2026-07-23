import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { PrismaService } from '../../database/prisma.service';
import { RankingGroup } from './dto';

describe('RankingService Unit Tests', () => {
  let service: RankingService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    prisma = {
      $queryRaw: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTopRanking', () => {
    it('should generate dynamic SQL and map results for Group A', async () => {
      const mockDbRows = [
        {
          registrationNumber: '01000001',
          math: 9.5,
          physics: 9.0,
          chemistry: 9.75,
          total: 28.25,
        },
      ];
      prisma.$queryRaw.mockResolvedValue(mockDbRows);

      const result = await service.getTopRanking(RankingGroup.A);

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        registrationNumber: '01000001',
        math: 9.5,
        physics: 9.0,
        chemistry: 9.75,
        total: 28.25,
      });
    });

    it('should generate dynamic SQL and map results for Group D', async () => {
      const mockDbRows = [
        {
          registrationNumber: '01000002',
          math: 9.8,
          literature: 9.75,
          foreignLanguage: 10,
          total: 29.55,
        },
      ];
      prisma.$queryRaw.mockResolvedValue(mockDbRows);

      const result = await service.getTopRanking(RankingGroup.D);

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        registrationNumber: '01000002',
        math: 9.8,
        literature: 9.75,
        foreignLanguage: 10,
        total: 29.55,
      });
    });

    it('should return an empty array if SQL query returns empty result', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      const result = await service.getTopRanking(RankingGroup.B);

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully with InternalServerErrorException', async () => {
      prisma.$queryRaw.mockRejectedValue(new Error('DB failure'));

      await expect(service.getTopRanking(RankingGroup.C)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
