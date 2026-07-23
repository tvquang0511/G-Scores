import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStudentByRegistrationNumber(registrationNumber: string) {
    const student = await this.prisma.student.findUnique({
      where: { registrationNumber },
    });

    if (!student) {
      throw new NotFoundException(`Student with registration number ${registrationNumber} not found`);
    }

    return student;
  }
}
