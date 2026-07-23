import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentLookupParamsDto {
  @ApiProperty({
    description: 'The 8-digit numeric registration number (Mã số báo danh)',
    example: '01000001',
    pattern: '^[0-9]{8}$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{8}$/, {
    message: 'Registration number must contain exactly 8 numeric digits',
  })
  registrationNumber: string;
}
