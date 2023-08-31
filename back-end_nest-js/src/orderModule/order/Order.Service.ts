import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "../database/Order.Entity";
import { Repository } from "typeorm";


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepo: Repository<OrderEntity>
    ){}
    async findAll(): Promise<OrderEntity[]>{
        const data = await this.orderRepo.find();
        return data;
    }
}