import { IsInt, IsPositive, IsOptional } from 'class-validator';
export class VersionDTO{
    pages: number;
    filters:string;
    limit: number;
    filterValue:any;
}