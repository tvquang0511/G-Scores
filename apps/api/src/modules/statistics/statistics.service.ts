import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { SubjectStatisticsDto } from './dto';

interface SubjectConfig {
  key: string;
  name: string;
}

/**
 * Supported subjects configuration list.
 * Centralizes subject keys and display names to avoid duplication across the codebase.
 */
const SUPPORTED_SUBJECTS: SubjectConfig[] = [
  { key: 'math', name: 'Math' },
  { key: 'literature', name: 'Literature' },
  { key: 'foreignLanguage', name: 'Foreign Language' },
  { key: 'physics', name: 'Physics' },
  { key: 'chemistry', name: 'Chemistry' },
  { key: 'biology', name: 'Biology' },
  { key: 'history', name: 'History' },
  { key: 'geography', name: 'Geography' },
  { key: 'civicEducation', name: 'Civic Education' },
];

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves score distribution statistics across all supported subjects.
   * Delegates all counting and score range categorization directly to PostgreSQL
   * in a single query via conditional aggregation.
   */
  async getScoreStatistics(): Promise<SubjectStatisticsDto[]> {
    try {
      // Generate SQL conditional aggregation columns programmatically for each subject.
      // Comparison operators (e.g. >= 8) evaluate to false/NULL for NULL scores, automatically ignoring them.
      const selectColumns = SUPPORTED_SUBJECTS.map((s) => {
        const col = `"${s.key}"`;
        return `
          COUNT(CASE WHEN ${col} >= 8 THEN 1 END)::int AS "${s.key}_excellent",
          COUNT(CASE WHEN ${col} >= 6 AND ${col} < 8 THEN 1 END)::int AS "${s.key}_good",
          COUNT(CASE WHEN ${col} >= 4 AND ${col} < 6 THEN 1 END)::int AS "${s.key}_average",
          COUNT(CASE WHEN ${col} < 4 THEN 1 END)::int AS "${s.key}_poor"
        `;
      }).join(',');

      // Execute a single SQL query delegating all aggregation work to PostgreSQL
      const sqlQuery = Prisma.raw(`SELECT ${selectColumns} FROM "Student"`);
      const rawResults = await this.prisma.$queryRaw<Record<string, number>[]>(sqlQuery);

      if (!rawResults || rawResults.length === 0 || !rawResults[0]) {
        return [];
      }

      const rawResult = rawResults[0];

      // Map aggregated SQL results into SubjectStatisticsDto[]
      return SUPPORTED_SUBJECTS.map((s) => ({
        subject: s.key,
        subjectName: s.name,
        excellent: Number(rawResult[`${s.key}_excellent`]) || 0,
        good: Number(rawResult[`${s.key}_good`]) || 0,
        average: Number(rawResult[`${s.key}_average`]) || 0,
        poor: Number(rawResult[`${s.key}_poor`]) || 0,
      }));
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve score statistics: ${error.message || 'Database error'}`,
      );
    }
  }
}
