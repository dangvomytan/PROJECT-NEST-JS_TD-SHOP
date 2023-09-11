import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItemEntity } from "../database/OrderItem.Entity";
import { OrderItemController } from "./OrderItem.Controller";
import { OrderItemService } from "./OrderItem.Service";


@Module({
    imports:[TypeOrmModule.forFeature([OrderItemEntity])],
    controllers:[OrderItemController],
    providers:[OrderItemService],  
    exports:[OrderItemService],
})

export class OrderItemModule{}