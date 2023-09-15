import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "../database/Admin.Entity";
import { AdminController } from "./Admin.Controller";
import { AdminService } from "./Admin.Service";

@Module({
    imports:[TypeOrmModule.forFeature([AdminEntity])],
    controllers:[AdminController],
    providers:[AdminService],
    exports:[AdminService]
})

export class AdminModule {}