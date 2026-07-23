import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { GroupARankingResponseDto } from './dto';

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the Top 10 students in Group A (Math, Physics, Chemistry).
   * Executes a single PostgreSQL raw query that filters NULL scores, computes total sum,
   * sorts descending by total, and limits the result set to 10 rows.
   */
  async getTopGroupARanking(): Promise<GroupARankingResponseDto[]> {
    try {
      const sqlQuery = Prisma.sql`
        SELECT
          "registrationNumber",
          "math",
          "physics",
          "chemistry",
          ROUND(("math" + "physics" + "chemistry")::numeric, 2)::float AS "total"
        FROM "Student"
        WHERE "math" IS NOT NULL
          AND "physics" IS NOT NULL
          AND "chemistry" IS NOT NULL
        ORDER BY ("math" + "physics" + "chemistry") DESC
        LIMIT 10
      `;

      const rawResults = await this.prisma.$queryRaw<GroupARankingResponseDto[]>(sqlQuery);

      if (!rawResults || rawResults.length === 0) {
        return [];
      }

      return rawResults.map((student) => ({
        registrationNumber: student.registrationNumber,
        math: Number(student.math),
        physics: Number(student.physics),
        chemistry: Number(student.chemistry),
        total: Number(student.total),
      }));
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to retrieve Group A ranking: ${error.message || 'Database error'}`,
      );
    }
  }
}
