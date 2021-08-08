import { LoanEntity } from './loan.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity])],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
