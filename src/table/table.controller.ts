import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './table.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table } from './entities/table.entity';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get(`:id`)
  @ApiOperation({
    summary: 'Buscar mesa por id',
  })
  findOne(@Param(`id`) id:string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as mesas',
  })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Adicionar nova mesa',
  })
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }
}
