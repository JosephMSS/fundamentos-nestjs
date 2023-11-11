import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Example of product name' })
  readonly name: string;

  @ApiProperty({ example: 'Example of product description' })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty({ example: 'https://i.imgur.com/U4iGx1j.jpeg' })
  @IsUrl()
  readonly image: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsPositive()
  readonly brandId: number;
}
