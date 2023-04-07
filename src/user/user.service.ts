import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { handleError } from 'src/utils/handleError';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  private userSelect = {
    id: true,
    name: true,
    photo: true,
    password: false,
    createdAt: true,
    updatedAt: true,
  }

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const response = await this.prisma.user.findUnique(
      {
        where: { id },
        select: this.userSelect,
      });
    if (!response) {
      throw new BadRequestException(`Registro com id não encontrado.`);
    }
    return response;
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(`As senhas não coincidem`);
    }
    delete dto.confirmPassword;
    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10)
    };

    return this.prisma.user.create(
    {
      data,
      select: this.userSelect
    }).catch(handleError);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    delete dto.confirmPassword;
    const data: Partial<User> = { ...dto };

    return this.prisma.user.update({
      where: { id },
      data,
      select: this.userSelect,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } }).catch(handleError);
  }
}
