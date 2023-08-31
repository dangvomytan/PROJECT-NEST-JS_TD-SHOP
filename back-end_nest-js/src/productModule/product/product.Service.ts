import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { ProductEntity } from "../database/Product.Entity";
import { Repository } from "typeorm";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>
    ){}
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepo.find();
    }
    // async allInfoProByIdVer(id: any): Promise<ProductEntity[]>
    // {
    //     const result = await this.productRepo
    //     .createQueryBuilder('product')
    //   .leftJoinAndSelect('tbl_version.product', 'product')
    //   .getMany();
        
    //     return result;
    // }
}