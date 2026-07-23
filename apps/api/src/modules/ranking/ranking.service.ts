import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { RankingGroup } from './dto';

export type SubjectKey =
  | 'math'
  | 'literature'
  | 'foreignLanguage'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history'
  | 'geography'
  | 'civicEducation';

/**
 * Single configuration mapping for university subject groups (A, A1, B, C, D).
 * Maps each RankingGroup enum key to its corresponding 3 database score columns.
 */
export const SUBJECT_GROUPS: Record<
  RankingGroup,
  [SubjectKey, SubjectKey, SubjectKey]
> = {
  [RankingGroup.A]: ['math', 'physics', 'chemistry'],
  [RankingGroup.A1]: ['math', 'physics', 'foreignLanguage'],
  [RankingGroup.B]: ['math', 'chemistry', 'biology'],
  [RankingGroup.C]: ['literature', 'history', 'geography'],
  [RankingGroup.D]: ['math', 'literature', 'foreignLanguage'],
};

const TOP_RANKING_LIMIT = 10;

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the Top 10 students with the highest total score for a specified university subject group.
   * Generates a single dynamic SQL query executed on PostgreSQL, filtering NULL scores for the group subjects.
   */
  async getTopRanking(group: RankingGroup): Promise<Record<string, any>[]> {
    const subjects = SUBJECT_GROUPS[group];
    if (!subjects) {
      return [];
    }

    const [s1, s2, s3] = subjects;

    try {
      const sqlQuery = Prisma.raw(`
        SELECT
          "registrationNumber",
          "${s1}",
          "${s2}",
          "${s3}",
          ROUND(("${s1}" + "${s2}" + "${s3}")::numeric, 2)::float AS "total"
        FROM "Student"
        WHERE "${s1}" IS NOT NULL
          AND "${s2}" IS NOT NULL
          AND "${s3}" IS NOT NULL
        ORDER BY ("${s1}" + "${s2}" + "${s3}") DESC
        LIMIT ${TOP_RANKING_LIMIT}
      `);

      const rawResults = await this.prisma.$queryRaw<Record<string, any>[]>(sqlQuery);

      if (!rawResults || rawResults.length === 0) {
        return [];
      }

      return rawResults.map((student) => ({
        registrationNumber: student.registrationNumber,
        [s1]: Number(student[s1]),
        [s2]: Number(student[s2]),
        [s3]: Number(student[s3]),
        total: Number(student.total),
      }));
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve ranking for group ${group}: ${error.message || 'Database error'}`,
      );
    }
  }
}
