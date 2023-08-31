import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "../database/User.Entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ){}
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepo.find();
    }
}