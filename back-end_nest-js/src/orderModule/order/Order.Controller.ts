import { Controller, Get } from "@nestjs/common";
import { OrderService } from "./Order.Service";


@Controller('api/v1/order')
export class OrderController
{
    constructor(private orderService: OrderService){}

    @Get()
    findAll(){
        console.log('hahah');
        
        return this.orderService.findAll();
    }
}