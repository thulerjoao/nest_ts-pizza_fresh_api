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
    summary: 'Search table by id',
  })
  findOne(@Param(`id`) id: string): Promise<Table> {
    return this.tableService.findOne(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'List all tables',
  })
  findAll(): Promise<Table[]> {
    return this.tableService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create new table',
  })
  create(@Body() dto: CreateTableDto) {
    return this.tableService.create(dto);
  }

  @Patch(`:id`)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update table by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTableDto): Promise<Table> {
    return this.tableService.update(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:id`)
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete table by id',
  })
  delete(@Param(`id`) id: string){
    this.tableService.delete(id)
  }
}
