import {
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
//create a enum whit admin role
export enum Role {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsEnum(Role)
  role: string;
}
