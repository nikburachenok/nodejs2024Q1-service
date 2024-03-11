import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  constructor(dto: UpdateUserDto) {
    this.oldPassword = dto.oldPassword;
    this.newPassword = dto.newPassword;
  }
}
