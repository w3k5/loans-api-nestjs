import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './ormconfig';
import { UserModule } from './user/user.module';
import { LoanModule } from './loan/loan.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
    LoanModule,
  ],
})
export class AppModule {}
