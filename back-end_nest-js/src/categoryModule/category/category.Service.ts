import { Repository } from "typeorm";
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from "../database/category.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoryService
{
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepo: Repository<CategoryEntity>
    ){}

    async findAll(): Promise<CategoryEntity[]>{
        const data = await this.categoryRepo.find();
        return data;
    }
}