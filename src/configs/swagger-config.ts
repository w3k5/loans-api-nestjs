import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Loans')
  .setVersion('1.0')
  .addTag('loans')
  .build();

export default config;
