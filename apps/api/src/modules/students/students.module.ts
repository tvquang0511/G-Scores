import { Module } from '@nestjs/common';
import { StudentsController } from './controllers';
import { StudentsService } from './services';

@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
