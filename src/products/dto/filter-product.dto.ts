import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';

export class FilterProductDto {
  @IsPositive()
  @IsOptional()
  limit: number;
  @Min(0)
  @IsOptional()
  offset: number;
  @IsOptional()
  @IsPositive()
  minPrice: number;

  @IsPositive()
  @ValidateIf((params) => params.minPrice)
  maxPrice: number;
}
