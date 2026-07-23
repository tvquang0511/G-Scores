import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from '../services';
import { GetStudentParamsDto } from '../dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(':registrationNumber')
  @ApiOperation({ 
    summary: 'Lookup a student', 
    description: 'Retrieves a student record by their registration number.' 
  })
  @ApiResponse({ status: 200, description: 'The student was successfully found.' })
  @ApiResponse({ status: 404, description: 'Student with the given registration number was not found.' })
  async getStudent(@Param(new ValidationPipe()) params: GetStudentParamsDto) {
    return this.studentsService.getStudentByRegistrationNumber(params.registrationNumber);
  }
}
