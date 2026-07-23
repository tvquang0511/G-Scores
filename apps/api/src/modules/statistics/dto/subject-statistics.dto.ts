import { ApiProperty } from '@nestjs/swagger';

export class SubjectStatisticsDto {
  @ApiProperty({
    description: 'Subject code identifier (e.g., math, literature)',
    example: 'math',
  })
  subject: string;

  @ApiProperty({
    description: 'Display name of the subject (e.g., Toán, Ngữ văn)',
    example: 'Toán',
  })
  subjectName: string;

  @ApiProperty({
    description: 'Number of students with score >= 8',
    example: 1520,
  })
  excellent: number;

  @ApiProperty({
    description: 'Number of students with 6 <= score < 8',
    example: 3400,
  })
  good: number;

  @ApiProperty({
    description: 'Number of students with 4 <= score < 6',
    example: 2800,
  })
  average: number;

  @ApiProperty({
    description: 'Number of students with score < 4',
    example: 450,
  })
  poor: number;
}
