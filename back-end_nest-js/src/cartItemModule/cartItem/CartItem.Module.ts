import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemService } from "./CartItem.Service";
import { CartItemController } from "./CartItem.Controller";
import { CartItemEntity } from "../database/CartItem.Entity";



@Module({
    imports:[TypeOrmModule.forFeature([CartItemEntity])],
    controllers:[CartItemController],
    providers:[CartItemService],
    exports:[CartItemService],
})
export class CartItemModule {}