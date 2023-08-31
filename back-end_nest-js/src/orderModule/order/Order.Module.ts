import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "../database/Order.Entity";
import { OrderController } from "./Order.Controller";
import { OrderService } from "./Order.Service";

@Module({
    imports:[TypeOrmModule.forFeature([OrderEntity])],
    controllers:[OrderController],
    providers:[OrderService],  
    exports:[OrderService],
})
export class OrderModule {}