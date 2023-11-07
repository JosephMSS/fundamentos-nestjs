import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  IsPositive,
  IsOptional,
} from 'class-validator';
//create a enum whit admin role
export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ description: 'email description' })
  readonly email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
  @ApiProperty()
  @IsEnum(Role)
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly customerId: string;
}
