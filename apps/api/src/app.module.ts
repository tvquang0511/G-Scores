import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [StudentsModule, StatisticsModule, RankingModule, PrismaModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
