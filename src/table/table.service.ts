import { Injectable } from "@nestjs/common";
import { Table } from "./entities/table.entity";
import { CreateTableDto } from './table.dto'

@Injectable()
export class TableService {
  tables: Table[] = []

  findAll(){
    return 'Buscar todas as mesas service'
  }

  create(createTableDto:CreateTableDto){
    const table: Table = { id:'' , ...createTableDto}

    this.tables.push(table)

    return table
  }
}


