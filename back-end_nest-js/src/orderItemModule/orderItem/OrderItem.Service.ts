import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { OrderItemEntity } from "../database/OrderItem.Entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItemEntity)
        private orderItemRepo: Repository<OrderItemEntity>
    ) { }
    async findAllOrderItemById(id: number, pages: number, limit: number) {
        try {
            const skip: number = (pages - 1) * limit;
            let queryBuilder: SelectQueryBuilder<OrderItemEntity>;
            queryBuilder = this.orderItemRepo.createQueryBuilder('tbl_orderitem')
                .leftJoinAndSelect('tbl_orderitem.tbl_version', 'tbl_version')
                .leftJoinAndSelect('tbl_orderitem.tbl_product', 'tbl_product')
                .where('tbl_orderitem.order_Id = :id', { id: id })
            // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
            const dataOrderItem = await queryBuilder.skip(skip).take(limit).getMany();
            let totalItem: number = await queryBuilder.getCount();
            // Tính toán tổng số trang
            const totalPage: number = Math.ceil(totalItem / limit);
            return { dataOrderItem, totalPage, pages, limit }
        } catch (error) {
            console.log(error);
            return error
        }
    }
}