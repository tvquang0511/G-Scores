import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { RankingModule } from './modules/ranking/ranking.module';

@Module({
  imports: [StudentsModule, StatisticsModule, RankingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
