import { Module } from "@nestjs/common";
import { ProductEntity } from "../database/Product.Entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./product.Controller";
import { ProductService } from "./product.Service";

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity])],
    controllers:[ProductController],
    providers:[ProductService],
    exports:[ProductService],
})
export class ProductModule{}
