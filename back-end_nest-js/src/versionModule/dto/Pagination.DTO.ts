import { IsInt, IsPositive, IsOptional } from 'class-validator';
export class PaginationDTO{
    @IsInt()
    @IsPositive()
    @IsOptional()
    page: number;
  
    @IsInt()
    @IsPositive()
    @IsOptional()
    limit: number;
}