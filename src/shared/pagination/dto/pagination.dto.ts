import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export const DEFAULT_LIMIT = 10;
export const DEFAULT_SKIP = 0;

export class PaginationDTO {
  @ApiProperty({
    required: false,
    default: DEFAULT_SKIP,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value != null) return Number(value);
    return DEFAULT_SKIP;
  })
  skip = DEFAULT_SKIP;

  @ApiProperty({
    required: false,
    default: DEFAULT_LIMIT,
  })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    if (value != null) return Number(value);
    return DEFAULT_LIMIT;
  })
  limit = DEFAULT_LIMIT;
}
