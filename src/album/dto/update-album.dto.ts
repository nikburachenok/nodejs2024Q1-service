import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  constructor(dto: UpdateAlbumDto) {
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto.artistId;
  }
}
