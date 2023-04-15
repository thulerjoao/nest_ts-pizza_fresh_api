import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateOrderProductDto } from './create-order-product.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário que está criando o pedido',
    example: 'e1bc0c89-a319-44df-a6e9-db66fe7b956b',
  })
  userId: string;

  @IsInt()
  @ApiProperty({
    description: 'Númerto da mesa do pedido',
    example: '1',
  })
  tableNumber: number;

  @IsUUID(undefined, { each: true })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  @ApiProperty({
    description: 'ID dos produtos que estão no pedido',
    example: [
      'e1bc0c89-a319-44df-a6e9-db66fe7b956b',
      'e1bc0c89-a319-44df-a6e9dfasd',
    ],
  })
  products: CreateOrderProductDto[];
}
