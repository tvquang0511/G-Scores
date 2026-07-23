import { Controller, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { RankingService } from './ranking.service';
import { GroupARankingResponseDto } from './dto';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy danh sách Top 10 học sinh khối A',
    description:
      'Lấy danh sách Top 10 học sinh có tổng điểm khối A (Toán + Lý + Hóa) cao nhất. Loại bỏ các thí sinh bị thiếu điểm ở một trong ba môn này.',
  })
  @ApiOkResponse({
    description: 'Danh sách Top 10 thí sinh khối A được lấy thành công.',
    type: [GroupARankingResponseDto],
  })
  @ApiInternalServerErrorResponse({
    description: 'Lỗi server trong quá trình truy vấn dữ liệu xếp hạng.',
  })
  async getTopGroupARanking(): Promise<GroupARankingResponseDto[]> {
    return this.rankingService.getTopGroupARanking();
  }
}
