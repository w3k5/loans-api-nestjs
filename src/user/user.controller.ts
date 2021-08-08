import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/user-create.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register middleware' })
  @ApiResponse({ status: 200, type: String, description: 'Return JWT Token' })
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login middleware' })
  @ApiResponse({ status: 200, type: String, description: 'Return JWT Token' })
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return await this.userService.loginUser(loginUserDto);
  }

  @Get('all')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }
}
