import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { GroupARankingResponseDto } from './dto';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Top 10 students in Group A',
    description:
      'Retrieves the Top 10 students with the highest total score in Group A (Math + Physics + Chemistry). Students with missing scores in any of these subjects are excluded.',
  })
  @ApiOkResponse({
    description: 'Top 10 Group A students retrieved successfully.',
    type: [GroupARankingResponseDto],
  })
  async getTopGroupARanking(): Promise<GroupARankingResponseDto[]> {
    return this.rankingService.getTopGroupARanking();
  }
}
