import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentResponseDto {
  @ApiProperty({
    description: 'Registration number (8 numeric digits)',
    example: '01000001',
  })
  registrationNumber: string;

  @ApiPropertyOptional({
    description: 'Math score',
    type: Number,
    nullable: true,
    example: 8.5,
  })
  math: number | null;

  @ApiPropertyOptional({
    description: 'Literature score',
    type: Number,
    nullable: true,
    example: 7.25,
  })
  literature: number | null;

  @ApiPropertyOptional({
    description: 'Foreign language score',
    type: Number,
    nullable: true,
    example: 9.0,
  })
  foreignLanguage: number | null;

  @ApiPropertyOptional({
    description: 'Physics score',
    type: Number,
    nullable: true,
    example: 8.0,
  })
  physics: number | null;

  @ApiPropertyOptional({
    description: 'Chemistry score',
    type: Number,
    nullable: true,
    example: 7.5,
  })
  chemistry: number | null;

  @ApiPropertyOptional({
    description: 'Biology score',
    type: Number,
    nullable: true,
    example: 6.5,
  })
  biology: number | null;

  @ApiPropertyOptional({
    description: 'History score',
    type: Number,
    nullable: true,
    example: 8.25,
  })
  history: number | null;

  @ApiPropertyOptional({
    description: 'Geography score',
    type: Number,
    nullable: true,
    example: 7.75,
  })
  geography: number | null;

  @ApiPropertyOptional({
    description: 'Civic education score',
    type: Number,
    nullable: true,
    example: 9.25,
  })
  civicEducation: number | null;

  @ApiPropertyOptional({
    description: 'Foreign language code (e.g., N1 for English)',
    type: String,
    nullable: true,
    example: 'N1',
  })
  foreignLanguageCode: string | null;
}
