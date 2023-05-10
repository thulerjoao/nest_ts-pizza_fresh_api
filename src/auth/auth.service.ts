import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    ) {}


  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const { nickname, password } = dto

    const user = await this.prisma.user.findUnique({where: { nickname }})
    if (!user){
        throw new UnauthorizedException('User not found');
    }

    const isHashValid  = await bcrypt.compare(password, user.password)
    if(!isHashValid){
        throw new UnauthorizedException('Senha inválida');
    }

    delete user.password;

    return{
      token: this.jwtService.sign({ nickname }),
      user: user
    }
  }
}
