import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;

  constructor(dto: UpdateTrackDto) {
    this.name = dto.name;
    this.artistId = dto.artistId;
    this.albumId = dto.albumId;
    this.duration = dto.duration;
  }
}
