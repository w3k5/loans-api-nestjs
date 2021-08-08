import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLoanDto } from './dto/create-loan.dto';

@ApiTags('Loan')
@Controller('loan')
export class LoanController {
  @Post()
  async create(@Body() createLoadDto: CreateLoanDto): Promise<CreateLoanDto> {
    return createLoadDto;
  }
}
