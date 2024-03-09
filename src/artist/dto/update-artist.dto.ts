import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateArtistDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
