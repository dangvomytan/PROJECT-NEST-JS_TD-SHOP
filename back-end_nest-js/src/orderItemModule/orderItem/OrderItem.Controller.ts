import { Controller, Get } from "@nestjs/common";
import { OrderItemService } from "./OrderItem.Service";

@Controller('api/v1/orderitem')
export class OrderItemController
{
    constructor(
        public orderItemService: OrderItemService,
    ){}
    
    @Get()
    getAllVersions()
    {
    console.log('all versions');
    return this.orderItemService.findAll();
    }
}