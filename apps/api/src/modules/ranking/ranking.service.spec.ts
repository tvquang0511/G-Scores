import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { PrismaService } from '../../database/prisma.service';

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

  describe('getTopGroupARanking', () => {
    it('should execute a single raw SQL query and map results correctly', async () => {
      const mockDbRows = [
        {
          registrationNumber: '01000001',
          math: 9.5,
          physics: 9.0,
          chemistry: 9.75,
          total: 28.25,
        },
        {
          registrationNumber: '01000002',
          math: 9.0,
          physics: 9.25,
          chemistry: 9.5,
          total: 27.75,
        },
      ];
      prisma.$queryRaw.mockResolvedValue(mockDbRows);

      const result = await service.getTopGroupARanking();

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        registrationNumber: '01000001',
        math: 9.5,
        physics: 9.0,
        chemistry: 9.75,
        total: 28.25,
      });
      expect(result[1]).toEqual({
        registrationNumber: '01000002',
        math: 9.0,
        physics: 9.25,
        chemistry: 9.5,
        total: 27.75,
      });
    });

    it('should return an empty array if SQL query returns empty result', async () => {
      prisma.$queryRaw.mockResolvedValue([]);

      const result = await service.getTopGroupARanking();

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should handle database errors gracefully with InternalServerErrorException', async () => {
      prisma.$queryRaw.mockRejectedValue(new Error('DB connection failed'));

      await expect(service.getTopGroupARanking()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
