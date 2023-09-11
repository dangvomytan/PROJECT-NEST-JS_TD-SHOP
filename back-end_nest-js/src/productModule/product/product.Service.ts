import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { ProductEntity } from "../database/Product.Entity";
import { Repository, SelectQueryBuilder } from "typeorm";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepo: Repository<ProductEntity>
    ){}

        async findAllProduct( pages: number, limit: number) 
        {
            const skip: number = (pages - 1) * limit;
            let queryBuilder: SelectQueryBuilder<ProductEntity>;
            queryBuilder = this.productRepo.createQueryBuilder('tbl_product')
            // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
            const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
            let totalItem: number = await queryBuilder.getCount();
            // Tính toán tổng số trang
            const totalPage: number = Math.ceil(totalItem / limit);
            console.log(totalPage);
            
            return { dataProduct, totalPage, pages, limit };
        }

        async findSearchProduct( pages: number, limit: number, search:string) 
        {
            const skip: number = (pages - 1) * limit;
            let queryBuilder: SelectQueryBuilder<ProductEntity>;
            queryBuilder = this.productRepo.createQueryBuilder('tbl_product')
            .where('tbl_product.product_Name LIKE:keyword ', { keyword: `%${search}%`  })
            // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
            const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
            let totalItem: number = await queryBuilder.getCount();
            // Tính toán tổng số trang
            const totalPage: number = Math.ceil(totalItem / limit);
            console.log(totalPage);
            
            return { dataProduct, totalPage, pages, limit };
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