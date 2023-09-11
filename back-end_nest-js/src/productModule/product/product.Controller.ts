import {Controller, Get, Param, Query} from '@nestjs/common'
import { ProductService } from './product.Service';

@Controller('api/v1/product')

export class ProductController {
    constructor(
        public productService: ProductService
    ){}
    @Get()
    getAllProduct(@Query() query)
    {
        const {pages,limit,search}=query
        console.log('product', query);
        if(!search)
        return this.productService.findAllProduct(pages,limit);
        else
        return this.productService.findSearchProduct(pages,limit,search);
    }

    // @Get('get-all-info-pro-by-id-ver/:id')
    // getAllInfoProByIdVer(@Param() id: number) 
    // {
    //     return this.productService.allInfoProByIdVer(id)
    // }
}