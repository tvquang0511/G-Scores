import { ApiProperty } from '@nestjs/swagger';

export class GroupARankingResponseDto {
  @ApiProperty({
    description: 'Mã số báo danh của học sinh (8 chữ số)',
    example: '01000001',
    type: String,
  })
  registrationNumber: string;

  @ApiProperty({
    description: 'Điểm môn Toán',
    example: 9.5,
    type: Number,
  })
  math: number;

  @ApiProperty({
    description: 'Điểm môn Vật Lý',
    example: 9.0,
    type: Number,
  })
  physics: number;

  @ApiProperty({
    description: 'Điểm môn Hóa Học',
    example: 9.75,
    type: Number,
  })
  chemistry: number;

  @ApiProperty({
    description: 'Tổng điểm khối A (Toán + Lý + Hóa)',
    example: 28.25,
    type: Number,
  })
  total: number;
}
