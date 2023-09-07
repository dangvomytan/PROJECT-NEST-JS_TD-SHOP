import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../database/Order.Entity";
import { Repository } from "typeorm";
import { OrderItemEntity } from "src/orderItemModule/database/OrderItem.Entity";
import { CartItemEntity } from "src/cartItemModule/database/CartItem.Entity";

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

    async findAll(): Promise<OrderEntity[]> {
        const data = await this.orderRepo.find();
        return data;
    }

    async createOrder(body: any) {
        const { cart, order } = body;
        const infoOrder = {
            address: order.address,
            phone: order.phone,
            method: order.method,
            user_Id: order.user_Id,
            status: order.status,
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
}
