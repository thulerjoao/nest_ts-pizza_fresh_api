import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Informe o usuário",
    example: "thulerjoao"
  })
  nickname: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Senha do usuário",
    example: "Abcd@1234"
  })
  password:string
}

