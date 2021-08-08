import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'admin', description: 'Username' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'admin@mail.ru', description: 'Email' })
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({
    example: 'password',
    description: 'Password',
    minLength: 8,
    maxLength: 32,
  })
  readonly password: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    example: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    description: 'Avatar URL',
    nullable: true,
  })
  readonly image: string | null;
}
