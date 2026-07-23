import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig, swaggerConfig } from './config';
import { StudentsModule } from './modules/students/students.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { RankingModule } from './modules/ranking/ranking.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, swaggerConfig],
    }),
    StudentsModule,
    StatisticsModule,
    RankingModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
