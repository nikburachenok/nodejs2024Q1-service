import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  constructor(dto: CreateTrackDto) {
    this.name = dto.name;
    this.artistId = dto.artistId;
    this.albumId = dto.albumId;
    this.duration = dto.duration;
  }
}
