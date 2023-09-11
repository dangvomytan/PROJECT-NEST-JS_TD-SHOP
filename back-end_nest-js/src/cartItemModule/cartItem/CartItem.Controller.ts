import { Body, Controller, Get, Param, Patch, Post, Delete } from "@nestjs/common";
import { CartItemService } from "./CartItem.Service";
import { CartItemDTO } from "../dto/CartItem.Dto";
import path from "path";


@Controller('api/v1/cart-item')
export class CartItemController
{
    constructor (
        private cartItemService: CartItemService
    ) {}

    @Get()
    // test
    get()
    {
        return {status:"ok"}
    }
    // get all prodcut  on cart
    @Get('/get-cart-by-user/:id')
    getCartByUser(@Param() param:CartItemDTO)
    {
        return this.cartItemService.getCartByUser(param.id)
    }
    // add product to cart
    @Post('/add-to-cart')
    addToCart(@Body() body: CartItemDTO)
    {
        return this.cartItemService.addToCart(body)
    }


    //update quantity item cart
    @Patch('/update-qty-cart-item')
    updateQtyCartItem(@Body() body: CartItemDTO)
    {
        return this.cartItemService.updateQtyCartItem(body)
    }

        //delete item cart
        @Delete('/delete-cart-item/:id')
        deleteCartItem(@Param() param: CartItemDTO)
        {
            return this.cartItemService.deleteCartItem(param.id)
        }
}