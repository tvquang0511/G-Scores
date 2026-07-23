import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { RankingGroup, RankingResponseDto } from './dto';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('g-a')
  @ApiOperation({
    summary: 'Get Top 10 students in Group A (Math, Physics, Chemistry)',
    description:
      'Retrieves the Top 10 students with the highest total score in Group A (Math + Physics + Chemistry). Excludes students missing any subject score.',
  })
  @ApiOkResponse({
    description: 'Top 10 Group A students retrieved successfully.',
    type: [RankingResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred while computing ranking.',
  })
  async getTopGroupA(): Promise<Record<string, any>[]> {
    return this.rankingService.getTopRanking(RankingGroup.A);
  }

  @Get('g-a1')
  @ApiOperation({
    summary: 'Get Top 10 students in Group A1 (Math, Physics, Foreign Language)',
    description:
      'Retrieves the Top 10 students with the highest total score in Group A1 (Math + Physics + Foreign Language). Excludes students missing any subject score.',
  })
  @ApiOkResponse({
    description: 'Top 10 Group A1 students retrieved successfully.',
    type: [RankingResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred while computing ranking.',
  })
  async getTopGroupA1(): Promise<Record<string, any>[]> {
    return this.rankingService.getTopRanking(RankingGroup.A1);
  }

  @Get('g-b')
  @ApiOperation({
    summary: 'Get Top 10 students in Group B (Math, Chemistry, Biology)',
    description:
      'Retrieves the Top 10 students with the highest total score in Group B (Math + Chemistry + Biology). Excludes students missing any subject score.',
  })
  @ApiOkResponse({
    description: 'Top 10 Group B students retrieved successfully.',
    type: [RankingResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred while computing ranking.',
  })
  async getTopGroupB(): Promise<Record<string, any>[]> {
    return this.rankingService.getTopRanking(RankingGroup.B);
  }

  @Get('g-c')
  @ApiOperation({
    summary: 'Get Top 10 students in Group C (Literature, History, Geography)',
    description:
      'Retrieves the Top 10 students with the highest total score in Group C (Literature + History + Geography). Excludes students missing any subject score.',
  })
  @ApiOkResponse({
    description: 'Top 10 Group C students retrieved successfully.',
    type: [RankingResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred while computing ranking.',
  })
  async getTopGroupC(): Promise<Record<string, any>[]> {
    return this.rankingService.getTopRanking(RankingGroup.C);
  }

  @Get('g-d')
  @ApiOperation({
    summary: 'Get Top 10 students in Group D (Math, Literature, Foreign Language)',
    description:
      'Retrieves the Top 10 students with the highest total score in Group D (Math + Literature + Foreign Language). Excludes students missing any subject score.',
  })
  @ApiOkResponse({
    description: 'Top 10 Group D students retrieved successfully.',
    type: [RankingResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error occurred while computing ranking.',
  })
  async getTopGroupD(): Promise<Record<string, any>[]> {
    return this.rankingService.getTopRanking(RankingGroup.D);
  }
}
