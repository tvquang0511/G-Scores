import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { StudentsService } from '../services';
import { GetStudentParamsDto, StudentLookupParamsDto, StudentResponseDto } from '../dto';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(':registrationNumber')
  @ApiOperation({
    summary: 'Lookup a student by registration number',
    description: 'Retrieves exam score details for a student using their 8-digit registration number.',
  })
  @ApiParam({
    name: 'registrationNumber',
    description: 'The 8-digit numeric registration number (Mã số báo danh)',
    example: '01000001',
    type: String,
  })
  @ApiOkResponse({
    description: 'Student record found successfully.',
    type: StudentResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid registration number format. Must contain exactly 8 numeric digits.',
  })
  @ApiNotFoundResponse({
    description: 'Student with the specified registration number was not found.',
  })
  async getStudent(@Param(new ValidationPipe()) params: StudentLookupParamsDto): Promise<StudentResponseDto> {
    return this.studentsService.getStudentByRegistrationNumber(params.registrationNumber);
  }
}
