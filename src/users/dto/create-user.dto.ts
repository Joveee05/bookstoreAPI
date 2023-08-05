import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;
}

export type User = {
  id: number;
  email: string;
  name: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
};
