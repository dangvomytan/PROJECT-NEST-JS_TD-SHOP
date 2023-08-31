import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItemEntity } from "../database/CartItem.Entity";



@Injectable()
export class CartItemService {
    constructor(
        @InjectRepository(CartItemEntity)
        private cartItemRepo: Repository<CartItemEntity>
    ){}
    async findAll(): Promise<CartItemEntity[]>{
        const data = await this.cartItemRepo.find();
        return data;
    }
}