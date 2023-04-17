import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'nickname',
    example: 'thulerjoao',
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User name',
    example: 'João Pedro',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'photo url',
    example: '',
  })
  photo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password',
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'confirm password',
    example: 'Abcd@1234',
  })
  confirmPassword:string;
}
