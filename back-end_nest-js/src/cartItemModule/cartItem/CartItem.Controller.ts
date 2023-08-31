import { Controller, Get } from "@nestjs/common";
import { CartItemService } from "./CartItem.Service";


@Controller('api/v1/cartitem')
export class CartItemController
{
    constructor (
        private cartItemService: CartItemService
    ) {}

    @Get()
    getAll()
    {
        return this.cartItemService.findAll()
    }
}