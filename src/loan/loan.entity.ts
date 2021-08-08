import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'loans' })
export class LoanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bank: string;

  @Column()
  loanName: string;

  @Column()
  loan: number;
}
