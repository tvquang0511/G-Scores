import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { SubjectStatisticsDto } from './dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get score distribution statistics by subject',
    description:
      'Aggregates student exam scores into 4 performance levels (excellent >= 8, good 6-8, average 4-6, poor < 4) for every subject.',
  })
  @ApiOkResponse({
    description: 'Score distribution statistics for all subjects retrieved successfully.',
    type: [SubjectStatisticsDto],
  })
  @ApiTooManyRequestsResponse({
    description: 'Rate limit exceeded. Maximum 30 requests per 60 seconds.',
  })
  async getStatistics(): Promise<SubjectStatisticsDto[]> {
    return this.statisticsService.getScoreStatistics();
  }
}
