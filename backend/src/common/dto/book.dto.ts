import { IsInt, IsOptional, IsString, IsArray } from 'class-validator';

export class BookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genreNames?: string[];
}
