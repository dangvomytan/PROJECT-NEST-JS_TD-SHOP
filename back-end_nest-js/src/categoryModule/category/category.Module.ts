import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "../database/category.entity";
import { Module } from "@nestjs/common";
import { CategoryController } from "./catogory.Controller";
import { CategoryService } from "./category.Service";


@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity])],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}
