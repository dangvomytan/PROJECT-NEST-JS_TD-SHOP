import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../database/Order.Entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { OrderItemEntity } from "src/orderItemModule/database/OrderItem.Entity";
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";
import { OrderDTO } from "../dto/Order.dto";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private orderItemRepo: Repository<OrderItemEntity>,
        @InjectRepository(CartItemEntity)
        private cartItemRepo: Repository<CartItemEntity>
    ) {}
    // sort date create
    async getAllOrderSortDate(pages: number, limit: number, sortValue:"ASC"|"DESC")
    {
        try{
        console.log(sortValue);
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<OrderEntity>;
        queryBuilder = this.orderRepo.createQueryBuilder('tbl_order')
        .leftJoinAndSelect('tbl_order.tbl_user', 'user')
        .leftJoinAndSelect('tbl_order.tbl_orderitem', 'tbl_orderitem')
        .orderBy('tbl_order.createdAt', sortValue); 
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataOrder = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);
        return { dataOrder, totalPage, pages, limit }
    }
    catch(err)
    {
        console.log(err);
    }
    }
    // sort Status
    async getAllOrderSortStatus(pages: number, limit: number, sortValue:"ASC"|"DESC")
    {
        try{
        console.log(sortValue);
        const skip: number = (pages - 1) * limit;
        let queryBuilder: SelectQueryBuilder<OrderEntity>;
        queryBuilder = this.orderRepo.createQueryBuilder('tbl_order')
        .leftJoinAndSelect('tbl_order.tbl_user', 'user')
        .leftJoinAndSelect('tbl_order.tbl_orderitem', 'tbl_orderitem')
        .orderBy('tbl_order.status', sortValue); 
        // Thực hiện phân trang bằng cách bỏ qua các mục không cần thiết và lấy số lượng mục trên mỗi trang
        const dataOrder = await queryBuilder.skip(skip).take(limit).getMany();
        let totalItem: number = await queryBuilder.getCount();
        // Tính toán tổng số trang
        const totalPage: number = Math.ceil(totalItem / limit);
        return { dataOrder, totalPage, pages, limit }
    }
    catch(err)
    {
        console.log(err);
    }
    }

    async createOrder(body: any) {
        const { cart, order } = body;
        const infoOrder = {
            address: order.address,
            phone: order.phone,
            method: order.method,
            user_Id: order.user_Id,
            status: order.status,
            total:order.total,
        };
        
        try {
            // Tạo một đơn hàng mới
            const newOrder = await this.orderRepo.save(infoOrder);

            // Thêm item vào order
            //để đảm bảo rằng tất cả các lệnh đều được hoàn thành trước khi tiếp tục vòng lặp.
            await Promise.all(cart?.map(async (item:CartItemEntity) => {
                const cartItem = {
                    quantity: item.quantity,
                    price_Pay: Number(item.tbl_version.price) * Number(item.quantity),
                    order_Id: newOrder.id,
                    product_Id: item.tbl_product.id,
                    version_Id: item.tbl_version.id,
                };
                await this.orderItemRepo.save(cartItem);
                await this.cartItemRepo.remove(item);
            }));
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
async updateStatus(body:any,id:number)
    {       
        console.log(id);
        
        try {
            const order = await this.orderRepo.findOne({where: { id: id }});
        if (!order) {
            throw new Error(`Không tìm thấy đơn hàng với ID: ${id}`);
        }
        order.status = body.status; 

        // Lưu đơn hàng đã cập nhật
        const updatedOrder = await this.orderRepo.save(order);
        return updatedOrder;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    
}
