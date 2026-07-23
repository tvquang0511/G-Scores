import { ArgumentMetadata, BadRequestException, ValidationPipe } from '@nestjs/common';
import { StudentLookupParamsDto } from '../dto';
import { StudentsController } from './students.controller';
import { StudentsService } from '../services';

describe('StudentsController & StudentLookupParamsDto Validation', () => {
  let validationPipe: ValidationPipe;
  let controller: StudentsController;
  let service: jest.Mocked<StudentsService>;

  beforeEach(() => {
    validationPipe = new ValidationPipe({ transform: true });
    service = {
      getStudentByRegistrationNumber: jest.fn(),
    } as any;
    controller = new StudentsController(service);
  });

  const metadata: ArgumentMetadata = {
    type: 'param',
    metatype: StudentLookupParamsDto,
    data: 'registrationNumber',
  };

  it('should accept valid 8-digit registration number', async () => {
    const validDto = { registrationNumber: '01000001' };
    const result = await validationPipe.transform(validDto, metadata);
    expect(result.registrationNumber).toBe('01000001');
  });

  it('should reject registration number with non-digits', async () => {
    const invalidDto = { registrationNumber: '0100000a' };
    await expect(validationPipe.transform(invalidDto, metadata)).rejects.toThrow(BadRequestException);
    expect(service.getStudentByRegistrationNumber).not.toHaveBeenCalled();
  });

  it('should reject registration number with fewer than 8 digits', async () => {
    const invalidDto = { registrationNumber: '1234567' };
    await expect(validationPipe.transform(invalidDto, metadata)).rejects.toThrow(BadRequestException);
    expect(service.getStudentByRegistrationNumber).not.toHaveBeenCalled();
  });

  it('should reject registration number with more than 8 digits', async () => {
    const invalidDto = { registrationNumber: '123456789' };
    await expect(validationPipe.transform(invalidDto, metadata)).rejects.toThrow(BadRequestException);
    expect(service.getStudentByRegistrationNumber).not.toHaveBeenCalled();
  });
});
