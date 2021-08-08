import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare as comparePassword, hash } from 'bcrypt';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    if (
      (await this.getUserByKey(createUserDto, 'email')) ||
      (await this.getUserByKey(createUserDto, 'username'))
    ) {
      throw new HttpException(
        'Email or username already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(createUserDto.password, 10);
    const newUser: CreateUserDto = { ...createUserDto, password: hashPassword };
    const user = await this.userRepository.save(newUser);
    return this.generateJwt(user);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.validateUser(loginUserDto);
    return this.generateJwt(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserByKey(
    user: CreateUserDto | LoginUserDto,
    key: string,
  ): Promise<UserEntity> | null {
    const candidate = await this.userRepository.findOne({ [key]: user[key] });
    return candidate || null;
  }

  private generateJwt(user: Omit<UserEntity, 'hashPassword'>): string {
    const { id, username, email, role } = user;
    return this.jwtService.sign({ id, username, email, role });
  }

  private async validateUser(user: LoginUserDto): Promise<UserEntity> {
    const candidate = await this.userRepository.findOne(
      { email: user.email },
      {
        select: ['id', 'username', 'email', 'image', 'role', 'password'],
      },
    );

    if (!candidate)
      throw new UnauthorizedException({ message: 'Credentials are not valid' });

    const isPasswordEquals = await comparePassword(
      user.password,
      candidate.password,
    );

    if (!isPasswordEquals)
      throw new UnauthorizedException({ message: 'Credentials are not valid' });

    return candidate;
  }
}
