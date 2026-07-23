import { registerAs } from '@nestjs/config';

export const swaggerConfig = registerAs('swagger', () => ({
  title: 'G-Scores API',
  description: 'Tài liệu API cho hệ thống G-Scores',
  version: '1.0',
  path: 'api/docs',
}));
