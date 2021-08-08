import { EUserRole } from './types/user-role.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ example: 'admin@mail.ru', description: 'Email' })
  email: string;

  @Column()
  @ApiProperty({ example: 'admin', description: 'Username' })
  username: string;

  @Column({ select: false })
  @ApiProperty({
    example: 'password',
    description: 'Password',
    minLength: 8,
    maxLength: 32,
  })
  password: string;

  @Column({ default: null, nullable: true })
  @ApiProperty({
    example: 'http://localhost:3000/img.png',
    description: 'Avatar URL',
  })
  image: string;

  @ApiProperty({
    example: EUserRole.ADMIN,
    description: 'User role',
  })
  @Column({ default: EUserRole.USER })
  role: EUserRole;
}
