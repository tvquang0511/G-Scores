import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RankingResponseDto {
  @ApiProperty({
    description: 'Registration number of the student (8 numeric digits)',
    example: '01000001',
  })
  registrationNumber: string;

  @ApiPropertyOptional({ description: 'Math score', example: 9.5 })
  math?: number;

  @ApiPropertyOptional({ description: 'Literature score', example: 8.75 })
  literature?: number;

  @ApiPropertyOptional({ description: 'Foreign Language score', example: 9.25 })
  foreignLanguage?: number;

  @ApiPropertyOptional({ description: 'Physics score', example: 9.0 })
  physics?: number;

  @ApiPropertyOptional({ description: 'Chemistry score', example: 9.75 })
  chemistry?: number;

  @ApiPropertyOptional({ description: 'Biology score', example: 8.5 })
  biology?: number;

  @ApiPropertyOptional({ description: 'History score', example: 8.25 })
  history?: number;

  @ApiPropertyOptional({ description: 'Geography score', example: 8.0 })
  geography?: number;

  @ApiProperty({
    description: 'Total score for the 3 subjects in the requested group',
    example: 28.25,
  })
  total: number;
}
