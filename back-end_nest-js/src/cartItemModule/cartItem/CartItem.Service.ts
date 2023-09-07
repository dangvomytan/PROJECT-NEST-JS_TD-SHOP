import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItemEntity } from "../database/CartItem.Entity";
import { Repository } from "typeorm";



@Injectable()
export class CartItemService {
    constructor(
        @InjectRepository(CartItemEntity)
        public cartItemRepo: Repository<CartItemEntity>
    ) { }

    // get all cart items by user id
    async getCartByUser(user_id) {
        try {
            const cartItemsByUser = await this.cartItemRepo
                .createQueryBuilder('cartItem')
                .leftJoinAndSelect('cartItem.tbl_product', 'tbl_product')
                .leftJoinAndSelect('cartItem.tbl_version', 'tbl_version')
                .where('cartItem.user_Id = :user_id', { user_id: user_id })
                .getMany();
            return cartItemsByUser;
        }
        catch (err) {
            console.log(err);
        }
    }

    // add to cart
    async addToCart(body) {
        try {
            const existingCartItem = await this.cartItemRepo.findOne({ where: { version_Id: body.version_Id, user_Id:body.user_Id } });
            if (existingCartItem) {
                // Nếu đã tồn tại một mục trong giỏ hàng với ID tương tự,
                existingCartItem.quantity = Number(existingCartItem.quantity) + Number(body.quantity);
                return this.cartItemRepo.save(existingCartItem);
            }
            else {
                // Nếu không tìm thấy mục trong giỏ hàng, tạo một mục mới
                const newItem = this.cartItemRepo.create({
                    user_Id: Number(body.user_Id),
                    product_Id: Number(body.product_Id),
                    version_Id: Number(body.version_Id),
                    quantity: Number(body.quantity),
                });
                return this.cartItemRepo.save(newItem);
            }
        }
        catch (err) {
            // Xử lý lỗi ở đây
            console.error("Error:", err);
            throw err;
        }
    }

    // update quantity cart item
    async updateQtyCartItem(body) {
        const { id, quantity } = body
        try {
            const existingCartItem = await this.cartItemRepo.findOne({ where: { id: id } });
            if (!existingCartItem) {
                // Trả về mã trạng thái HTTP 404 Not Found nếu không tìm thấy
                return { status: 404, message: "Not found" };
            } else {
                // Kiểm tra tính hợp lệ của quantity
                const newQuantity = Number(quantity);
                if (isNaN(newQuantity) || newQuantity < 0) {
                    return { status: 400, message: "Invalid quantity" };
                }

                // Cập nhật số lượng và lưu vào cơ sở dữ liệu
                existingCartItem.quantity = newQuantity;
                await this.cartItemRepo.save(existingCartItem);
                return { status: 200, message: "Quantity updated successfully" };
            }
        } catch (err) {
            // Xử lý lỗi ở đây
            console.error("Error:", err);
            throw err;
        }
    }
    //delete cart item
    async deleteCartItem(id) {
        try {
            const existingCartItem = await this.cartItemRepo.findOne({ where: { id } });
            if (!existingCartItem) {
                // Trả về mã trạng thái HTTP 404 Not Found nếu không tìm thấy
                return { status: 404, message: "Not found" };
            }
            await this.cartItemRepo.remove(existingCartItem);
            return { status: 200, message: "Delete successfully" };
        } catch (err) {
            // Xử lý lỗi ở đây
            console.error("Error:", err);
            throw err;
        }
    }
}