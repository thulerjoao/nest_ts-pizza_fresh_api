import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './table.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table } from './entities/table.entity';
import { UpdateTableDto } from './update-table.dto';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get(`:id`)
  @ApiOperation({
    summary: 'Buscar mesa por id',
  })
  findOne(@Param(`id`) id: string): Promise<Table> {
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

  @Patch(`:id`)
  @ApiOperation({
    summary: 'Atualizar mesa por id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tableService.update(id, dto);
  }

  @Delete(`:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir mesa por id',
  })
  delete(@Param(`id`) id: string){
    this.tableService.delete(id)
  }
}
