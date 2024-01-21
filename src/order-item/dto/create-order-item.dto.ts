import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;
}
