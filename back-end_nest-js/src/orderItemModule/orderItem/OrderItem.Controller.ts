import { Controller, Get, Query } from "@nestjs/common";
import { OrderItemService } from "./OrderItem.Service";

@Controller('api/v1/order-item')
export class OrderItemController
{
    constructor(
        public orderItemService: OrderItemService,
    ){}
    
    @Get()
    getAllOrderItemById(@Query() query){
        const {id, pages, limit} = query
        console.log("order item",query);
        return this.orderItemService.findAllOrderItemById(id ,pages, limit);
    }
}