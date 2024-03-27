import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(dto: CreateUserDto) {
    this.login = dto.login;
    this.password = dto.password;
  }
}
