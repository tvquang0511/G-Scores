import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { StudentResponseDto } from './dto';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentByRegistrationNumber(registrationNumber: string): Promise<StudentResponseDto> {
    const student = await this.prisma.student.findUnique({
      where: { registrationNumber },
    });

    if (!student) {
      throw new NotFoundException(`Student with registration number ${registrationNumber} not found`);
    }

    return {
      registrationNumber: student.registrationNumber,
      math: student.math,
      literature: student.literature,
      foreignLanguage: student.foreignLanguage,
      physics: student.physics,
      chemistry: student.chemistry,
      biology: student.biology,
      history: student.history,
      geography: student.geography,
      civicEducation: student.civicEducation,
      foreignLanguageCode: student.foreignLanguageCode,
    };
  }
}
