import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { OrderItemEntity } from "../database/OrderItem.Entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(OrderItemEntity)
        private orderItemRepo: Repository<OrderItemEntity>
    ){}
    async findAll()
    {
        return await this.orderItemRepo.find();
    }
}