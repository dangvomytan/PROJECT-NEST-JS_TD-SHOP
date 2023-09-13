import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { OrderService } from "./Order.Service";
import { OrderEntity } from "../database/Order.Entity";


@Controller('api/v1/order')
export class OrderController
{
    constructor(private orderService: OrderService){}

    @Get()
    getAllOrder(@Query() query:any){
        const {pages, limit, sort} = query
        console.log("orders",query);

            const [key, value] = sort.split(':');
           let sortValue:any = { [key]: value };
           console.log("v",value);
            if (key === "sortDate") 
            {
            return this.orderService.getAllOrderSortDate(pages, limit, value);
            }
            else
            if(key==="sortStatus")
            {
                return this.orderService.getAllOrderSortStatus(pages, limit, value);
            }
    }

    // create Order
    @Post('/create-order')
    createOrder(@Body() body:any)
    {
        return this.orderService.createOrder(body)
    }

    @Post('update-status/:id')
    upStatus(@Body() value:any, @Param() param:any)
    {

        return this.orderService.updateStatus(value,param.id )
    }
}