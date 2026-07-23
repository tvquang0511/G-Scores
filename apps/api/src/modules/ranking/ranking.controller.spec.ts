import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';

describe('RankingController Unit Tests', () => {
  let controller: RankingController;
  let service: jest.Mocked<RankingService>;

  beforeEach(async () => {
    service = {
      getTopGroupARanking: jest.fn(),
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
    service.getTopGroupARanking.mockResolvedValue(mockData);

    const result = await controller.getTopGroupARanking();

    expect(result).toEqual(mockData);
    expect(service.getTopGroupARanking).toHaveBeenCalledTimes(1);
  });
});
