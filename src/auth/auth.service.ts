import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    return{
      token: 'teste',
      user: undefined
    }
  }
}
