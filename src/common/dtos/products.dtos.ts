import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
/**
 * Class validator nos permite crear las validaciones en timpo de ejecucion
 * ! se debe use el middleware ValidationPipe en el main
 */
/**
 * Los DTO unicamente funcionan en la experiencia de desarrollo, para el tipado de los objeto,
 *  a nivel de ejecución no valida la información
 */
enum PRICES {
  CALIDAD = 10,
  POREJITO = 5,
  NAFA = 0,
}
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  @IsEnum(PRICES)
  readonly price: number;

  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  readonly image: string;
}
/**
 * Me crea las mismas validaciones pero sin que sean obligatorias 
 */
export class UpdateProductDto extends PartialType(CreateProductDto)
// export class UpdateProductDto {
//   readonly name?: string;
//   readonly description?: string;
//   readonly price?: number;
//   readonly stock?: number;
//   readonly image?: string;
// }
