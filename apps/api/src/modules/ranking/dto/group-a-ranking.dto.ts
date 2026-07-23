import { ApiProperty } from '@nestjs/swagger';

export class GroupARankingResponseDto {
  @ApiProperty({
    description: 'Registration number of the student (8 numeric digits)',
    example: '01000001',
  })
  registrationNumber: string;

  @ApiProperty({
    description: 'Math score',
    example: 9.5,
  })
  math: number;

  @ApiProperty({
    description: 'Physics score',
    example: 9.0,
  })
  physics: number;

  @ApiProperty({
    description: 'Chemistry score',
    example: 9.75,
  })
  chemistry: number;

  @ApiProperty({
    description: 'Total Group A score (math + physics + chemistry)',
    example: 28.25,
  })
  total: number;
}
