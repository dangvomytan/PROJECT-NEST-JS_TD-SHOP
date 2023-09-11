import {Body, Controller, Get, Post} from '@nestjs/common'
import { CategoryService } from './category.Service';
import { categoryDTO } from '../dto/category.dto';

@Controller('api/v1/category')
export class CategoryController
{
    constructor (public categoryService : CategoryService){}

    @Get()
    getAllCategory()
    {
        return this.categoryService.findAll()
    }
    @Post()
    createUser(@Body() body: categoryDTO) {
  
    //   this.Service.create(body)
    }
}