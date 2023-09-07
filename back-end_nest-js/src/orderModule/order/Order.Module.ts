import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "../database/Order.Entity";
import { OrderController } from "./Order.Controller";
import { OrderService } from "./Order.Service";
import { OrderItemEntity } from "src/orderItemModule/database/OrderItem.Entity";
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";

@Module({
    imports:[TypeOrmModule.forFeature([OrderEntity,OrderItemEntity,CartItemEntity])],
    controllers:[OrderController],
    providers:[OrderService],  
    exports:[OrderService],
})
export class OrderModule {}