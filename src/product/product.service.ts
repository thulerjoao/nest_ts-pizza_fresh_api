import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Product> {
    const response = await this.prisma.product.findUnique({ where: { id } });
    console.log(response);

    if (!response) {
      throw new BadRequestException(`Registro com id não encontrado.`);
    }
    return response;
  }

  async findOne(id: string): Promise<Product> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const data: Partial<Product> = { ...dto };

    await this.findById(id);

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  handleError(error: Error) {
    console.log(error.message);
    throw new UnprocessableEntityException(error.message);
    return undefined;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const data: Product = { ...dto };

    await this.prisma.product.create({ data }).catch(this.handleError); //({data:data}) is the same as ({data}) ==> implicit
    return undefined;
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    await this.prisma.product.delete({ where: { id } }).catch(this.handleError);
  }
}
