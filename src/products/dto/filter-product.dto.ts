import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterProductDto {
  @IsPositive()
  @IsOptional()
  limit: number;
  @Min(0)
  @IsOptional()
  offset: number;
}
