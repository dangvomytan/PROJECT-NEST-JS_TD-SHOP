import { Injectable } from "@nestjs/common";
import { VersionEntity } from "../database/Version.Entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";


@Injectable()
export class VersionService {
    constructor(
        @InjectRepository(VersionEntity)
        private versionRepo: Repository<VersionEntity>
    ) { }
    async findAll(): Promise<VersionEntity[]> {
        return await this.versionRepo.find();
    }
    // async findAll(): Promise<VersionEntity[]> {
    //     const imagesWithProducts = await this.versionRepo
    //   .createQueryBuilder('tbl_version')
    //   .leftJoinAndSelect('tbl_version.product', 'product')
    //   .getMany();
    //   return imagesWithProducts;
    // }
    // async findAllProductWithAllVersion(): Promise<VersionEntity[]> {
    //     const result =  await this.versionRepo.createQueryBuilder('tbl_version')
    //     .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product').getMany();
    //     return result;
    // }


    async findAllProductWithAllVersion(page: number = 1, limit: number = 6, filters: string) {
        try {
            const skip = (page - 1) * limit;
            let queryBuilder: SelectQueryBuilder<VersionEntity>;
            let totalItem: number;
    
            // Xử lý dữ liệu từ filters thành filterValue
            let filterValue: { [key: string]: number } | null = null;
            if (filters) {
                const [key, value] = filters.split('=');
                filterValue = { [key]: parseInt(value) };
            }
    
            // Kiểm tra nếu filterValue có thuộc tính filCate thì thực hiện truy vấn
            if (filterValue && filterValue.filCate != null) {
                queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
                    .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
                    .where('tbl_product.category_Id = :id', { id: filterValue.filCate });
    
                // Tạo một truy vấn mới để đếm tổng số mục
                totalItem = await queryBuilder.getCount();
            } 
            else 
            if(filterValue && filterValue.filBr != null){
                queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
                    .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product')
                    .where('tbl_product.product_Name = :name', { name: filterValue.Br });
    
                // Tạo một truy vấn mới để đếm tổng số mục
                totalItem = await queryBuilder.getCount();
            }
            else
            {
                // Nếu không có filterValue hoặc không có thuộc tính filCate, thực hiện truy vấn để đếm tổng số mục
                queryBuilder = this.versionRepo.createQueryBuilder('tbl_version')
                    .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product');
                totalItem = await queryBuilder.getCount();
            }
    
            // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
            const dataProduct = await queryBuilder.skip(skip).take(limit).getMany();
    
            // Tính toán tổng số trang
            const totalPage: number = Math.ceil(totalItem / limit);
    
            return { dataProduct, totalPage, page, limit, filters: filters };
        } catch (err) {
            console.log(err);
            // Xử lý lỗi nếu có
        }
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