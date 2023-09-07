import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "./Order.Service";
import { OrderEntity } from "../database/Order.Entity";


@Controller('api/v1/order')
export class OrderController
{
    constructor(private orderService: OrderService){}

    @Get()
    test(){
        console.log('ok');
    }

    // create Order
    @Post('/create-order')
    createOrder(@Body() body:any)
    {
        return this.orderService.createOrder(body)
    }
}