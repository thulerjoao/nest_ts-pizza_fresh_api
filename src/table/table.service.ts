import { Injectable } from '@nestjs/common';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './table.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTableDto } from './update-table.dto';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    await this.prisma.table.delete({ where: { id }})
  }

  update(id: string, dto: UpdateTableDto): Promise<Table> {
    const data: Partial<Table> = { ...dto}

    return this.prisma.table.update({
      where: { id },
      data
    })
  }

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
