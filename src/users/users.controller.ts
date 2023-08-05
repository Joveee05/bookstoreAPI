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

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: '2 Users found',
    type: UserEntity,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User found',
    type: UserEntity,
    isArray: true,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'User updated',
    type: UserEntity,
    isArray: true,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  @Post('login')
  async login(
    @Body()
    existingUser: ExistingUserDTO,
  ): Promise<{ status: string; message: string; data: any } | null> {
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
