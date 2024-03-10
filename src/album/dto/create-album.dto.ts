import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  constructor(dto: CreateAlbumDto) {
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto.artistId;
  }
}
