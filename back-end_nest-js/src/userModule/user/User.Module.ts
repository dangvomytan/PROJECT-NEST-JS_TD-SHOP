import { Module } from "@nestjs/common";
import { UserService } from "./User.Service";
import { UserController } from "./User.Controller";
import { UserEntity } from "../database/User.Entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})

export class UserModule {}