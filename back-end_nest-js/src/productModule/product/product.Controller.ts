import {Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common'
import { ProductService } from './product.Service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerUpload } from 'src/utils/multer';
import { ProductEntity } from '../database/Product.Entity';

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
    @Post('/create-product')
    createProduct(@Body() body)
    {
        return this.productService.createProduct(body)
    }

    @Patch('/update-product')
    updateProduct(@Body() body)
    {
        return this.productService.updateProduct(body)
    }
    @Patch('/disable-product')
    disableProduct(@Body() body)
    {
        return this.productService.disableProduct(body)
    }
    // @Get('get-all-info-pro-by-id-ver/:id')
    // getAllInfoProByIdVer(@Param() id: number) 
    // {
    //     return this.productService.allInfoProByIdVer(id)
    // }
}