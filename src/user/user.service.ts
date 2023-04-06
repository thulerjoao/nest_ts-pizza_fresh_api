import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const response = await this.prisma.user.findUnique({ where: { id } });
    if (!response) {
      throw new BadRequestException(`Registro com id não encontrado.`);
    }
    return undefined;
  }
  handleError(error: Error) {
    console.log(error.message);
    throw new UnprocessableEntityException(error.message);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const data: CreateUserDto = { ...dto };
    await this.prisma.user.create({ data }).catch(this.handleError);
    return undefined;
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);

    const data: Partial<User> = { ...dto };
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id)
    return this.prisma.user.delete({where: { id }}).catch(this.handleError);
  }
}
