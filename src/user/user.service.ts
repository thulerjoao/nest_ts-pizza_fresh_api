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

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password === dto.confirmPassword) {
      delete dto.confirmPassword;
      const data: User = { ...dto };

      await this.prisma.user.create({ data }).catch(handleError);
    } else {
      throw new BadRequestException(`As senhas não coincidem`);
    }
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
    delete dto.confirmPassword;
    const data: Partial<User> = { ...dto };

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await this.findById(id);
    return this.prisma.user.delete({ where: { id } }).catch(handleError);
  }
}
