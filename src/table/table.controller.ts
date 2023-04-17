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
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/table.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Table } from './entities/table.entity';
import { UpdateTableDto } from './dto/update-table.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('table')
@Controller('table')
export class TableController {
  constructor(private tableService: TableService) {}

  @Get(`:id`)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Buscar mesa por id',
  })
  findOne(@Param(`id`) id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar todas as mesas',
  })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Adicionar nova mesa',
  })
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }

  @Patch(`:id`)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar mesa por id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tableService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:id`)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Excluir mesa por id',
  })
  delete(@Param(`id`) id: string){
    this.tableService.delete(id)
  }
}
