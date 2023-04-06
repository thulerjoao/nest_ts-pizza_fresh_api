import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Pizza de Mussarela',
  })
  title: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    description: 'Foto do produto',
    example: 'http://photodapizza.com',
  })
  photo: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Preço',
    example: 39.90,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Pizza recheada com mussarela coberta com queijo ralado',
  })
  description: string;
}
