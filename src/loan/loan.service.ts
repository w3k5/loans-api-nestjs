import { LoanEntity } from './loan.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(LoanEntity)
    private readonly loanRepository: Repository<LoanEntity>,
  ) {}
}
