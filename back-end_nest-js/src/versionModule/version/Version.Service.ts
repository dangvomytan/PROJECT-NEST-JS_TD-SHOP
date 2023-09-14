import { Injectable } from "@nestjs/common";
import { VersionEntity } from "../database/Version.Entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { VersionDTO } from "../dto/Version.DTO";


@Injectable()
export class VersionService {
    constructor(
        @InjectRepository(VersionEntity)
        private versionRepo: Repository<VersionEntity>
    ) {}
    async findAllVersionByProductId( pages: number, limit: number, id:number) 
    {
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<VersionEntity>;
        queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
        .where('tbl_version.product_Id = :id', { id: id });
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataVersion = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);
        console.log(totalPage);
        
        return { dataVersion, totalPage, pages, limit };
    }
    async findSearchVersionByProductId( pages: number, limit: number,search:string, id:number) 
    {
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<VersionEntity>;
        queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
        .where('tbl_version.product_Id = :id', { id: id })
        .andWhere('tbl_version.version_Name LIKE:keyword ', { keyword: `%${search}%`  })

        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataVersion = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);
        console.log(totalPage);
        
        return { dataVersion, totalPage, pages, limit };
    }

    // lay tat ca product
    async findAllProductWithAllVersion(query, pages: number = 1, limit: number = 6) {
        const { filters, filterValue } = query;
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<VersionEntity>;
        queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
            .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);

        return { dataProduct, totalPage, pages, limit, filters };
    }
    // loc theo category
    async findAllProductFilterByCategory(query, pages: number = 1, limit: number = 6) {
        const { filters, filterValue } = query;
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<VersionEntity>;
        queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
            .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
            .where('tbl_product.category_Id = :id', { id: filterValue.filCate });
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);

        return { dataProduct, totalPage, pages, limit, filters };
    }
    // loc theo ten product
    async findAllProductFilterByBrand(query, pages: number = 1, limit: number = 12) {
        const { filters, filterValue } = query;
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<VersionEntity>;
        queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
        .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
        .where('tbl_product.product_Name LIKE:keyword ', { keyword: `%${filterValue.filBrd}%`  });
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);

        return { dataProduct, totalPage, pages, limit, filters };
    }

    async findSearhProductWithAllVersion(query, pages: number = 1, limit: number = 6)
    {
        const { search } = query;
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<VersionEntity>;
        queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
        .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
        .where('tbl_product.product_Name LIKE:keyword ', { keyword: `%${search}%`  })
        .orWhere('tbl_version.version_Name LIKE:keyword ', { keyword: `%${search}%`  });
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);

        return { dataProduct, totalPage, pages, limit, search };
    }





    async findProductWithVersionByIdVer(idVer: any): Promise<any> {
        // console.log('id:', idVer);
        const product = await this.versionRepo.createQueryBuilder('tbl_version')
            .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
            .where('tbl_version.id = :id', { id: idVer })
            .getOne();

        // console.log(product);
        const tbl_version = await this.versionRepo.find({
            where: { product_Id: product.product_Id },
        });
        //   console.log(tbl_version);
        return { ...product, tbl_version };
    }
}