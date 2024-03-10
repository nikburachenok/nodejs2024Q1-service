import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;

  constructor(dto: CreateArtistDto) {
    this.name = dto.name;
    this.grammy = dto.grammy;
  }
}
