import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { RankingGroup } from './dto';

describe('RankingController Unit Tests', () => {
  let controller: RankingController;
  let service: jest.Mocked<RankingService>;

  beforeEach(async () => {
    service = {
      getTopRanking: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        {
          provide: RankingService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return Top 10 Group A ranking from service', async () => {
    const mockData = [
      {
        registrationNumber: '01000001',
        math: 9.5,
        physics: 9.0,
        chemistry: 9.75,
        total: 28.25,
      },
    ];
    service.getTopRanking.mockResolvedValue(mockData);

    const result = await controller.getTopGroupA();

    expect(result).toEqual(mockData);
    expect(service.getTopRanking).toHaveBeenCalledWith(RankingGroup.A);
  });

  it('should return Top 10 Group A1 ranking from service', async () => {
    const mockData = [
      {
        registrationNumber: '01000002',
        math: 9.5,
        physics: 9.0,
        foreignLanguage: 9.5,
        total: 28.0,
      },
    ];
    service.getTopRanking.mockResolvedValue(mockData);

    const result = await controller.getTopGroupA1();

    expect(result).toEqual(mockData);
    expect(service.getTopRanking).toHaveBeenCalledWith(RankingGroup.A1);
  });

  it('should return Top 10 Group B ranking from service', async () => {
    const mockData = [];
    service.getTopRanking.mockResolvedValue(mockData);

    const result = await controller.getTopGroupB();

    expect(result).toEqual(mockData);
    expect(service.getTopRanking).toHaveBeenCalledWith(RankingGroup.B);
  });

  it('should return Top 10 Group C ranking from service', async () => {
    const mockData = [];
    service.getTopRanking.mockResolvedValue(mockData);

    const result = await controller.getTopGroupC();

    expect(result).toEqual(mockData);
    expect(service.getTopRanking).toHaveBeenCalledWith(RankingGroup.C);
  });

  it('should return Top 10 Group D ranking from service', async () => {
    const mockData = [
      {
        registrationNumber: '01000003',
        math: 9.8,
        literature: 9.75,
        foreignLanguage: 10,
        total: 29.55,
      },
    ];
    service.getTopRanking.mockResolvedValue(mockData);

    const result = await controller.getTopGroupD();

    expect(result).toEqual(mockData);
    expect(service.getTopRanking).toHaveBeenCalledWith(RankingGroup.D);
  });
});
