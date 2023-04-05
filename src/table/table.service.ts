import { Injectable } from '@nestjs/common';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './table.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  findOne( id:string ): Promise<Table> {
    return this.prisma.table.findUnique({ where: { id } });
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };

    return this.prisma.table.create({ data }); //({data:data}) is the same ad ({data}) ==> implicit
  }
}
