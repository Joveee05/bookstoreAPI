import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, User } from './dto/create-user.dto';
import { ExistingUserDTO } from './dto/existing-user.dto';
import { LogsService } from 'src/logs/logs.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logService: LogsService,
  ) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Incorrect email');
    }

    return user;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Order created successfully',
    type: UserEntity,
    isArray: true,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const message = 'This is a log message. POST /api/users';
    await this.logService.log(message);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: '2 Users found',
    type: UserEntity,
    isArray: true,
  })
  async findAll() {
    const message = 'This is a log message. GET /api/users';
    await this.logService.log(message);
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User found',
    type: UserEntity,
    isArray: true,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const message = 'This is a log message. GET /api/users/:id';
    await this.logService.log(message);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'User updated',
    type: UserEntity,
    isArray: true,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const message = 'This is a log message. POST /api/users/:id';
    await this.logService.log(message);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const message = 'This is a log message. DELETE /api/users/:id';
    await this.logService.log(message);
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(
    @Body()
    existingUser: ExistingUserDTO,
  ): Promise<{ status: string; message: string; data: any } | null> {
    const message = 'This is a log message. POST /api/users/login';
    await this.logService.log(message);

    const { email } = existingUser;
    const user = await this.validateUser(email);

    if (!user) {
      throw new HttpException('Incorrect email', HttpStatus.UNAUTHORIZED);
    }
    return {
      status: 'success',
      message: 'Login successful',
      data: user,
    };
  }
}
