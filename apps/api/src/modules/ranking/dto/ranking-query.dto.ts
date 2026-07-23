import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RankingGroup } from './ranking-group.enum';

export class RankingQueryDto {
  @ApiProperty({
    description: 'University subject group code',
    enum: RankingGroup,
    example: RankingGroup.A,
  })
  @IsNotEmpty({ message: 'Group is required' })
  @IsEnum(RankingGroup, {
    message: 'Group must be one of: A, A1, B, C, D',
  })
  group: RankingGroup;
}
