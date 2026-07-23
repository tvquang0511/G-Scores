import { IsString, IsNotEmpty } from 'class-validator';

export class GetStudentParamsDto {
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;
}
