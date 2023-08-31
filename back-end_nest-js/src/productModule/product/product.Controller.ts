import {Controller, Get, Param} from '@nestjs/common'
import { ProductService } from './product.Service';

@Controller('api/v1/product')

export class ProductController {
    constructor(
        public productService: ProductService
    ){}
    @Get()
    getAllProduct()
    {
        console.log('all product');
        return this.productService.findAll();
    }

    // @Get('get-all-info-pro-by-id-ver/:id')
    // getAllInfoProByIdVer(@Param() id: number) 
    // {
    //     return this.productService.allInfoProByIdVer(id)
    // }
}