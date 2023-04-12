import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Criar um pedido',
  })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Listar todos os pedidos',
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({   // < TAGS DO SWAGGER
    summary: 'Buscar pedido por id',
  })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
}
