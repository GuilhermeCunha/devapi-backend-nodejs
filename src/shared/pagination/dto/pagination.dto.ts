import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDTO {
  @ApiProperty({
    required: false,
    default: 0,
  })
  @Transform(({ value }) => {
    if (value != null) return Number(value);
    return 10;
  })
  @IsOptional()
  @IsInt()
  skip: number;

  @ApiProperty({
    required: false,
    default: 10,
  })
  @Transform(({ value }) => {
    if (value != null) return Number(value);
    return 10;
  })
  @IsOptional()
  limit: number;
}
