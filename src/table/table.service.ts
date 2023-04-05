import { Injectable } from "@nestjs/common";
import { Table } from "./entities/table.entity";
import { CreateTableDto } from './table.dto'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TableService {
  tables: Table[] = []

  constructor(private readonly prisma: PrismaService) {}

  findAll(){
    return this.prisma.table.findMany()
  }

  create(createTableDto:CreateTableDto){
    const table: Table = { id:'' , ...createTableDto}

    this.tables.push(table)

    return table
  }
}


