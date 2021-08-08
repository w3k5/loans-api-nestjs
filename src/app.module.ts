import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './ormconfig';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UserModule,
  ],
})
export class AppModule {}
