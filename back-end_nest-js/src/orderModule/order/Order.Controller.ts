import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrderService } from "./Order.Service";
import { OrderEntity } from "../database/Order.Entity";


@Controller('api/v1/order')
export class OrderController
{
    constructor(private orderService: OrderService){}

    @Get()
    getAllOrder(@Query() query){
        const {pages, limit, search} = query
        return this.orderService.getAllOrder(pages, limit, search);
    }

    // create Order
    @Post('/create-order')
    createOrder(@Body() body:any)
    {
        return this.orderService.createOrder(body)
    }
}