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


    async findAllProductWithAllVersion(page: number = 1, perPage: number = 6) {
        const skip = (page - 1) * perPage;

        const queryBuilder: SelectQueryBuilder<VersionEntity> = this.versionRepo.createQueryBuilder('tbl_version')
            .leftJoinAndSelect('tbl_version.tbl_product', 'tbl_product');

        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const data = await queryBuilder.skip(skip).take(perPage).getMany();

        // Tạo một truy vấn mới để đếm tổng số mục
        const totalItem: number = await this.versionRepo.count();

        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / perPage);

        return { data, totalItem, totalPage, page };
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