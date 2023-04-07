import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './dto/table.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTableDto } from './dto/update-table.dto';
import { handleError } from 'src/utils/handleError';

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Table> {
    const response = await this.prisma.table.findUnique({ where: { id } });

    if (!response) {
      throw new BadRequestException(`Registro com id não encontrado.`);
    }
    return response;
  }

  async findOne(id: string): Promise<Table> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateTableDto): Promise<Table> {
    const data: Partial<Table> = { ...dto };

    await this.findById(id);

    return this.prisma.table.update({
      where: { id },
      data,
    });
  }

  async create(dto: CreateTableDto): Promise<Table> {
    const data: Table = { ...dto };

    await this.prisma.table.create({ data }).catch(handleError); //({data:data}) is the same as ({data}) ==> implicit
    return undefined;
  }

  findAll(): Promise<Table[]> {
    return this.prisma.table.findMany();
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    await this.prisma.table.delete({ where: { id } }).catch(handleError);
  }
}
